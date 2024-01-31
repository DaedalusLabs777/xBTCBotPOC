import json
import logging
import traceback
from flask import Flask, request, jsonify
from flask_cors import cross_origin, CORS
from bot import generate_response, inscribe
from kv_secrets import xBTCBotApiKey
import flask_jwt_extended as jwt
from datetime import timedelta
import requests


# --------------------------------------------------------------
# Setup
# --------------------------------------------------------------

app = Flask(__name__)
jwt_manager = jwt.JWTManager(app)
CORS(app)

# --------------------------------------------------------------
# App
# --------------------------------------------------------------

@app.route("/authenticate", methods=["POST"])
@cross_origin()
def authenticate():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    signature = request.json.get('signature', None)
    address = request.json.get('address', None)
    if not signature or not address:
        return jsonify({"msg": "Missing signature or address"}), 400

    url = '<custom_api_url>/authenticate'

    response = requests.post(url, headers={'Content-Type': 'application/json'}, data=json.dumps(request.json))
    auth_data = response.json()

    if auth_data["verified"]:
        expires = timedelta(minutes=10)
        access_token = jwt.create_access_token(identity=address, expires_delta=expires)

        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"error": "Unable to authenticate user signature"}), 500


@app.route("/", methods=["POST"])
@cross_origin()
def handle_chat_request():
    try:
        apiKey = request.headers.get("x-api-key")

        if apiKey != xBTCBotApiKey:
            return jsonify({"error": "Unauthorized Access"}), 401

        response = generate_response(request.json)

        return jsonify(response), 200
    except Exception as e:
        logging.error("An error occurred: %s", traceback.format_exc())
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

@app.route("/inscribe", methods=["POST"])
@cross_origin()
def handle_inscribe_request():
    try:
        apiKey = request.headers.get("x-api-key")

        if apiKey != xBTCBotApiKey:
            return jsonify({"error": "Unauthorized Access"}), 401

        response = inscribe(request.json)

        return jsonify(response), 200
    except Exception as e:
        logging.error("An error occurred: %s", traceback.format_exc())
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500 



if __name__ == '__main__':
    app.run(debug=True)
