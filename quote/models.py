from django.db import models
from django.contrib.auth.models import User
from inventory.models import Types

from client.models import Client
import json


import time

# Create your models here.
class Quote(models.Model):

    def content_default():
        return  {'units':[],'labor':[],'misc':[]}
    
    name=models.CharField(max_length=100, unique=True)
    create_ux=models.PositiveBigIntegerField(null=False, default=int(time.time()))
    modified_df=models.DateField(auto_now=True)
    start_df = models.DateField(blank=True, null=True)
    end_df = models.DateField(blank=True, null=True)
    shoot_days = models.PositiveSmallIntegerField(null=False, default=1)
    three_day_week=models.BooleanField(null=False, default=False)
    labor_total=models.PositiveIntegerField(null=False, default=0)
    gear_total=models.PositiveIntegerField(null=False, default=0)
    misc_total=models.PositiveIntegerField(null=False, default=0)
    equip_value=models.PositiveIntegerField(null=False, default=0)
    discount_value=models.PositiveIntegerField(null=False, default=0)
    discount_percent=models.BooleanField(null=False, default=False)
    content = models.JSONField(null=False, default=content_default)
    
    
    
    client=models.ForeignKey(Client, on_delete=models.CASCADE, related_name='quotes', blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quotes')

    def __str__(self):
        return f"{self.id}: {self.name}"


class Labor(models.Model):
    name=models.CharField(max_length=100, unique=True, null=False)
    create_ux=models.PositiveBigIntegerField(null=False, default=int(time.time()))
    type=models.ForeignKey(Types, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return f"{self.id}: {self.name}"