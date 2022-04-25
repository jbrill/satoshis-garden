from django.shortcuts import render
from django.http import Http404
  
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
  
# from nodes.models import Node
# from nodes.serializers import NodeSerializer
import boto3
import json
from pprint import pprint

BUCKET_NAME = "lngraphoutput"
FILE_NAME = "202204181644.json"
AWS_SERVER_PUBLIC_KEY = "AKIA6LFMLHOOGQIODT7N"
AWS_SERVER_SECRET_KEY = "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"
session = boto3.Session(
    aws_access_key_id=AWS_SERVER_PUBLIC_KEY,
    aws_secret_access_key=AWS_SERVER_SECRET_KEY,
)
s3_resource = session.resource('s3')
first_object = s3_resource.Object(
    bucket_name=BUCKET_NAME, key=FILE_NAME
)
class NodesView(APIView):
    """
    List all Nodes, or create a new Node
    """
  
    def get(self, request, format=None):
        print(first_object)
        # nodes = Node.objects.all()
        # serializer = NodeSerializer(nodes, many=True)
        # return Response(serializer.data)
        file_content = first_object.get()['Body'].read().decode('utf-8')
        json_content = json.loads(file_content)
        # print(json_content.get("nodes"))
        for node in json_content.get("nodes"):
            pprint(node)
        pass
  
    def post(self, request, format=None):
        pass
  