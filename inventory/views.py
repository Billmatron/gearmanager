from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Unit, Inventory, Types, Make
from .serializers import UnitSerializer, InventorySerializer, TypesSerializer, MakeSerializer
import json
# Create your views here.
def index(request):
    return render(request, "inventory/index.html")

@api_view(['GET'])
def getRoutes(request):
    print(request.user.profile.zipcode)
    return Response("Gear API")

@api_view(['GET'])
def getUnits(request):
    unit = Unit.objects.all()
    serializer = UnitSerializer(unit, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUnit(request, pk):
    unit = Unit.objects.get(pk=pk)
    serializer = UnitSerializer(unit, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getInventory(request):
    user = request.user
    inventory = user.inventory.all()
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getInventoryFilter(request, type_name):
    inventory = Inventory.objects.filter(unit__types__name=type_name)
    serializer = InventorySerializer(inventory, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getInventoryItem(request, pk):
    unit = Inventory.objects.get(pk=pk)
    serializer = InventorySerializer(unit, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getTypes(request):
    types = Types.objects.all()
    serializer = TypesSerializer(types, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMakes(request):
    makes= Make.objects.all()
    serializer = MakeSerializer(makes, many=True)
    x = sorted(serializer.data, key=lambda k: (k['name']))
    return Response(x)


@api_view(['GET'])
def getUnitsByMake(request, make):
    make = Make.objects.filter(name=make).first()
    units = make.units.all()
    serializer = UnitSerializer(units, many=True)
    return Response(serializer.data)
