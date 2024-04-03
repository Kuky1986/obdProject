from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/obd2"
mongo = PyMongo(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    car_id = request.args.get('carId')  # Get carId from query parameters

    query = {}
    if car_id:
        query['VEHICLE_ID'] = car_id

    fields_to_retrieve = {
    'VEHICLE_ID': 1,
    'MARK': 1,
    'MODEL': 1,
    'CAR_YEAR': 1,
    'ENGINE_POWER': 1,
    'FUEL_TYPE': 1,
    'AUTOMATIC': 1,
    '_id': 0
}


    cursor = mongo.db.obd_scans.find(query, fields_to_retrieve).skip((page - 1) * per_page).limit(per_page)
    data = dumps(cursor)
    return data, 200


@app.route('/api/dtc', methods=['GET'])
def get_dtc():
    car_id = request.args.get('carId')  # Get carId from query parameters

    query = {}
    if car_id:
        query['VEHICLE_ID'] = car_id

    dtc_cursor = mongo.db.obd_scans.find(query, {'TROUBLE_CODES': 1, '_id': 0})  # Only retrieve TROUBLE_CODES field
    unique_dtcs = set()  # Use set to store unique DTCs
    for dtc_doc in dtc_cursor:
        if 'TROUBLE_CODES' in dtc_doc:  # Check if 'TROUBLE_CODES' field exists in document
            dtc_value = dtc_doc['TROUBLE_CODES']
            if isinstance(dtc_value, list):  # Check if TROUBLE_CODES is a list
                unique_dtcs.update(dtc_value)  # Add all TROUBLE_CODES in the list
            else:
                unique_dtcs.add(dtc_value)  # Add single TROUBLE_CODES
    # Convert set to list and return as JSON
    dtc_data = list(unique_dtcs)
    return jsonify(dtc_data), 200



if __name__ == '__main__':
    app.run(debug=True)
