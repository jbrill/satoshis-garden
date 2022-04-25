from django.shortcuts import render
from django.http import Http404
  
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
  
from server.models import (
    Node,
    Edge
)
# from nodes.serializers import NodeSerializer
import boto3
import json
from pprint import pprint


class NodesView(APIView):
    """
    List all Nodes, or create a new Node
    """
  
    def get(self, request, format=None):
        # print(first_object)
        # nodes = Node.objects.all()
        # serializer = NodeSerializer(nodes, many=True)
        # return Response(serializer.data)
        pass
  
    def post(self, request, format=None):
        pass
  