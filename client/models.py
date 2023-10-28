import time
from django.db import models
from django.contrib.auth.models import User
from home.models import Country, City, State

# Create your models here.

class Client(models.Model):
    name=models.CharField(max_length=100, unique=True)
    contact_name=models.CharField(max_length=100, blank=True)
    create_ux=models.PositiveBigIntegerField(null=False, default=int(time.time()))
    modified_df=models.DateField(auto_now=True)
    email=models.EmailField(blank=True, null=True)
    website=models.URLField(blank=True, null=True)
    phone=models.PositiveIntegerField(blank=True, null=True)
    address = models.CharField(blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='clients', blank=True, null=True)
    city=models.ForeignKey(City, on_delete=models.CASCADE, related_name='clients', blank=True, null=True)
    state=models.ForeignKey(State, on_delete=models.CASCADE, related_name='clients', null=True, blank=True)
    zipcode=models.PositiveIntegerField(blank=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='clients')

    def __str__(self):
        return f"{self.id}: {self.name}"