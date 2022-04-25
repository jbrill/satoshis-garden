import requests
import json
from pprint import pprint

res = requests.get("https://ln-scores.prod.lightningcluster.com/availability/v1/btc_summary.json")
# pprint(res.json())
print(res.json().keys())
import boto3
from pprint import pprint

BUCKET_NAME = "lngraphoutput"
FILE_NAME = "202204181644.json"
AWS_SERVER_PUBLIC_KEY = os.getenv("SERVER_PUB_KEY")
AWS_SERVER_SECRET_KEY = os.getenv("SERVER_SECRET_KEY")
session = boto3.Session(
    aws_access_key_id=AWS_SERVER_PUBLIC_KEY,
    aws_secret_access_key=AWS_SERVER_SECRET_KEY,
)
s3_resource = session.resource('s3')
first_object = s3_resource.Object(
    bucket_name=BUCKET_NAME, key=FILE_NAME
)

file_content = first_object.get()['Body'].read().decode('utf-8')
json_content = json.loads(file_content)

import psycopg2
try:
    conn = psycopg2.connect(dbname='ln_db', user='jasonbrill', host='localhost', password='', port=5432)

    cur = conn.cursor()
    cur.execute("""SELECT VERSION()""")
    row = cur.fetchone()
    print("Server version is ",row)

except:
    print('You have not connected')
# print(json_content.get("nodes"))
# for node in json_content.get("nodes"):
#     pprint(node)

pass