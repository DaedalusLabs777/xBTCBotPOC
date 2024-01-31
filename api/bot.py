import os
import json
import requests
import math
from brc20 import verify_brc20_inscription, get_brc20_limit
from cosmos import track_data

# --------------------------------------------------------------
# !!! REQUIRED FOR DEPLOYMENT !!!
# --------------------------------------------------------------

# __import__('pysqlite3')
# import sys
# sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')

# --------------------------------------------------------------
# Confidential AI Codebase
# --------------------------------------------------------------
#
#
# AI related code has been removed for confidentiallity
#
#
# --------------------------------------------------------------
# End of AI Codebase
# --------------------------------------------------------------

def inscribe_brc20_response(prompt, address, chat_history_str):
    response = {}
    inscription = brc20_function_reply(prompt)

    valid, error = verify_brc20_inscription(inscription, address)

    # Load the JSON string into a dictionary
    inscription_dict = json.loads(inscription)

    if not valid:
        response["response"] = error
        return response
    
    if inscription_dict["op"] == "mint":
        # batch case
        amount = int(inscription_dict["amt"])
        limit = int(get_brc20_limit(inscription_dict["tick"]))
        if amount > limit:
            mints = amount // limit
            remainder = amount % limit
            inscription_dict["amt"] = str(limit)
            
            # Serialize the dictionary to a JSON string
            serialized_inscription = json.dumps(inscription_dict)
            # Escaping single quotes in the JSON string
            serialized_inscription = serialized_inscription.replace("'", "\\'")

            response["inscriptions"] = [serialized_inscription for _ in range(mints)]

            if remainder > 0:
                inscription_dict["amt"] = str(remainder)
                serialized_inscription = json.dumps(inscription_dict)
                serialized_inscription = serialized_inscription.replace("'", "\\'")
                response["inscriptions"].append(serialized_inscription)
        # non-batch case
        else:
            serialized_inscription = json.dumps(inscription_dict)
            serialized_inscription = serialized_inscription.replace("'", "\\'")
            response["inscriptions"] = [serialized_inscription]

    response["response"] = "Successfully created inscription. Please accept to confirm the inscription."
    response["payload"] = {
        "metaprotocol": "brc-20"
    }

    return response



    return response

def inscribe(data):
    chat_list = data.get("chat_history", "")
    rbf = False
    if chat_list and chat_list[-1].get("payload", {}).get("rbf", {}).get("flag", False):
        rbf = True
        txid = chat_list[-1].get("payload", {}).get("rbf", {}).get("txid", "")

    data.pop("chat_history")
    jsonData = json.dumps(data)

    if rbf:
        data["payload"]["rbf"] = {"flag": True, "txid": txid}
        jsonData = json.dumps(data)
        apiUrl = '<custom_api_url>/batch_rbf'
    else:
        jsonData = json.dumps(data)
        apiUrl = '<custom_api_url>/batch_inscribe'

    response = requests.post(apiUrl, headers={'Content-Type': 'application/json'}, data=jsonData)

    # calculate minimum rbf fee rate
    json_response = response.json()
    curr_fee_amt = json_response["inscription"]["total_fees"]
    vsize = json_response["commit"]["vsize"]
    rbf_min_fee_rate = math.ceil(curr_fee_amt/vsize) + 1
    json_response["rbf_min_fee_rate"] = rbf_min_fee_rate

    ret = {}
    ret["response"] = json.dumps(json_response)
    ret["request"] = data  

    return ret
