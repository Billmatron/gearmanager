from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
def index(request):
    return render(request, "inventory/index.html")

@api_view(['GET'])
def getRoutes(request):
    return Response("Our API")