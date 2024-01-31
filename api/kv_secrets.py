import os
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

keyVaultName = "xbtcbotkv"
KVUri = f"https://{keyVaultName}.vault.azure.net"

credential = DefaultAzureCredential()
client = SecretClient(vault_url=KVUri, credential=credential)

openAPIKey = client.get_secret("OpenAI-APIKey").value
xBTCBotApiKey = client.get_secret("xBTCBot-APIKey").value
unisatAPIKey = client.get_secret("Unisat-APIKey").value
cosmosKey = client.get_secret("COSMOS-DB-KEY").value
cosmosEndpoint = client.get_secret("COSMOS-DB-ENDPOINT").value
