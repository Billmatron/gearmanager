from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Model
from .serializers import ModelsSerializer
import json
# Create your views here.
def index(request):
    return render(request, "inventory/index.html")

@api_view(['GET'])
def getRoutes(request):
    return Response("Our API")

@api_view(['GET'])
def getModels(request):
    models = Model.objects.all()
    serializer = ModelsSerializer(models, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getModel(request, pk):
    model = Model.objects.get(pk=pk)
    serializer = ModelsSerializer(model, many=False)
    return Response(serializer.data)