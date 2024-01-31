import uuid
from azure.cosmos import CosmosClient, exceptions, PartitionKey
from datetime import datetime
from kv_secrets import cosmosKey
from kv_secrets import cosmosEndpoint

# --------------------------------------------------------------
# CosmosDB Setup
# --------------------------------------------------------------

COSMOS_DB_DATABASE_NAME = "LLMInfo"
COSMOS_DB_CONTAINER_NAME = "LLMInfoContainer"
cosmos_client = CosmosClient(cosmosEndpoint, cosmosKey)
database = cosmos_client.get_database_client(COSMOS_DB_DATABASE_NAME)
container = database.get_container_client(COSMOS_DB_CONTAINER_NAME)

def track_data(response, prompt, address):
    timestamp = datetime.utcnow().isoformat() + 'Z'
    
    item = {
        'id': str(uuid.uuid4()),
        'response': response,
        'prompt': prompt,
        'address': address,
        'timestamp': timestamp
    }
    
    container.create_item(body=item)