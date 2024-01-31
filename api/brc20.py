import requests
import json
from kv_secrets import unisatAPIKey

headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {unisatAPIKey}"
}

def verify_brc20_inscription(inscription, address):
    try:
        inscription = json.loads(inscription)
        if inscription["p"] != "brc-20":
            return False, "Invalid BRC-20 inscription. Protocol is not set to BRC-20."
        if len(inscription["tick"]) != 4:
            return False, "Invalid inscription. Ticker must be 4 characters."
        
        ##### handles logic for batching if amount is greater than mint limit ####
        if inscription["op"] == "mint":
            amt = int(inscription["amt"])

            if verify_ticker(inscription["tick"]):
                return False, "Invalid mint inscription. The ticker is not deployed yet."
            if amt <= 0:
                return False, "Invalid mint inscription. Mint amount must be greater than 0."
            if get_brc20_supply(inscription["tick"]) < amt:
                return False, "Invalid mint inscription. Mint amount must be less than the supply."

            return True, ""
            
        elif inscription["op"] == "deploy":
            if not verify_ticker(inscription["tick"]):
                return False, "Invalid deploy inscription. The ticker is taken."
            if int(inscription["max"]) <= 0:
                return False, "Invalid deploy inscription. Max supply must be greater than 0."
            if int(inscription["lim"]) <= 0:
                return False, "Invalid deploy inscription. Limit must be greater than 0."
            if int(inscription["lim"]) > int(inscription["max"]):
                return False, "Invalid deploy inscription. Limit must be less than the total supply."
        elif inscription["op"] == "transfer":
            if verify_ticker(inscription["tick"]):
                return False, "Invalid transfer inscription. The ticker is not deployed yet."
            if int(inscription["amt"]) <= 0:
                return False, "Invalid transfer inscription. Amount must be greater than 0."
            if get_brc20_balance(inscription["tick"], address) < int(inscription["amt"]):
                return False, f"Invalid transfer inscription. Your balance is {get_brc20_balance(inscription['tick'], address)} and too low."
        else:
            print([inscription["op"]])
            return False, "Not a valid operation type (mint, deploy, transfer)"

        return True, ""
    except Exception as e:
        print(e)
        return False, "Failed to retrieve information to validate your BRC-20 inscription."

def get_brc20_supply(ticker):
    url = f'https://open-api.unisat.io/v1/indexer/brc20/{ticker}/info'

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception('Unisat network response was not ok')

    data = response.json()

    if data['code'] != 0:
        raise Exception(data['msg'])


    supply = int(data['data']['max']) - int(data['data']['minted'])
    return supply

def get_brc20_balance(ticker, address):
    url = f'https://open-api.unisat.io/v1/indexer/address/{address}/brc20/{ticker}/info'

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception('Network response was not ok')

    data = response.json()

    if data['code'] != 0:
        raise Exception(data['msg'])

    balance = int(data['data']['availableBalance'])
    return balance

def get_brc20_limit(ticker):
    url = f'https://open-api.unisat.io/v1/indexer/brc20/{ticker}/info'

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception('Network response was not ok')

    data = response.json()

    if data['code'] != 0:
        raise Exception(data['msg'])

    limit = int(data['data']['limit'])
    return limit

def verify_ticker(ticker):
    url = f'https://open-api.unisat.io/v1/indexer/brc20/{ticker}/info'

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception('Network response was not ok')
    
    data = response.json()

    if data['code'] == 0:
        return False

    return True