from django.urls import path

from . import views


urlpatterns = [
    #path("", views.index),
    path("", views.getRoutes, name='routes'),
    path("models/", views.getModels, name='models'),
    path('models/<str:pk>', views.getModel, name='model'),
]