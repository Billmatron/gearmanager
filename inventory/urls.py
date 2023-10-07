from django.urls import path

from . import views


urlpatterns = [
    #path("", views.index),
    path("", views.getRoutes, name='routes'),
    path("units/", views.getUnits, name='units'),
    path('units/<str:pk>', views.getUnit, name='unit'),
    path('inventory/', views.getInventory, name='inventory'),
    path('inventory/<str:type_name>', views.getInventoryFilter, name='inventory search'),
    path('inventory/<str:pk>', views.getInventoryItem, name='inventory item'),
]