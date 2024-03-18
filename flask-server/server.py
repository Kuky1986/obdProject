from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/obd2"
mongo = PyMongo(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    page = int(request.args.get('page', 1))  # Get page number from query parameters (default to 1)
    per_page = int(request.args.get('per_page', 10))  # Get number of items per page (default to 10)

    cursor = mongo.db.obd_scans.find().skip((page - 1) * per_page).limit(per_page)
    data = dumps(cursor)  # Convert to JSON using bson.json_util.dumps
    return data, 200

if __name__ == '__main__':
    app.run(debug=True)
