# Import the dependencies.
# import datetime as dt
import numpy as np

from pymongo import MongoClient

from flask import Flask, jsonify

from bson import json_util
import json
def parse_json(data):
    return json.loads(json_util.dumps(data))


#################################################
# Database Setup
#################################################
mongo = MongoClient(port=27017)
db = mongo.get_database('low_income_data')
block_groups = db["block_group_data"]

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"These are the block groups set up by the city<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/blockgroups<br/>"

    )


@app.route("/api/v1.0/blockgroups")
def blockgroups():
    """Return the precipitation data for the last year"""
    # Calculate the date 1 year ago from last date in database
    results = block_groups.find()

    blkgroup = []
    for item in results:
        blkgroup.append(parse_json(item))

    
    return jsonify(blkgroup) 

if __name__ == '__main__':
    app.run()
