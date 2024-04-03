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

    cursor = mongo.db.obd_scans.find(query).skip((page - 1) * per_page).limit(per_page)
    data = dumps(cursor)
    return data, 200

if __name__ == '__main__':
    app.run(debug=True)
