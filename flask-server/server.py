from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
import requests
import logging

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
    logging.info(f"Received car ID: {car_id}")

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
                # Split combined DTCs into individual codes
                combined_dtcs = [dtc_value[i:i+5] for i in range(0, len(dtc_value), 5)]  # Split every 5 characters
                unique_dtcs.update(combined_dtcs)  # Add individual DTCs to the set

    logging.info(f"Found DTCs: {unique_dtcs}")

    # Convert set to list and return as JSON
    dtc_data = list(unique_dtcs)
    return jsonify(dtc_data), 200


@app.route('/api/external', methods=['POST'])
def handle_external_api_call():
    # Get the DTC code from the request
    dtc = request.json.get('dtc')

    # Make API call to external service
    try:
        # Include the DTC code in the URL
        url = f'https://car-code.p.rapidapi.com/obd2/{dtc}'
        
        response = requests.get(url,
                                headers={'X-RapidAPI-Key': '33088fb2f4mshbeffa746658a86dp1c3037jsnebb1747af537', 'X-RapidAPI-Host': 'car-code.p.rapidapi.com'})
        response.raise_for_status()  # Raise an exception for HTTP errors
        external_data = response.json()  # Parse the JSON response
        return jsonify(external_data), 200
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/enginecoolanttemperature', methods=['GET'])
def get_engine_coolant_temperature():
    car_id = request.args.get('carId')  # Get carId from query parameters
    logging.info(f"Received car ID: {car_id}")

    query = {'VEHICLE_ID': car_id} if car_id else {}

    engine_coolant_data = []
    engine_coolant_cursor = mongo.db.obd_scans.find(query, {'ENGINE_COOLANT_TEMP': 1, '_id': 0})
    for doc in engine_coolant_cursor:
        try:
            engine_coolant_data.append(doc['ENGINE_COOLANT_TEMP'])
        except KeyError:
            # Skip documents where the field is missing
            pass

    logging.info(f"Engine coolant data: {engine_coolant_data}")
    return jsonify(engine_coolant_data), 200





if __name__ == '__main__':
    app.run(debug=True)
