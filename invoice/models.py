import time
from django.db import models
from django.contrib.auth.models import User
from home.models import Country, City
# Create your models here.

class Invoice(models.Model):
    number=models.CharField(max_length=100, null=False, default=1)
    create_ux=models.PositiveBigIntegerField(null=False, default=int(time.time()))
    modified_dt=models.DateField(auto_now=True)
    paid=models.BooleanField(null=False, default=False)
    total=models.PositiveIntegerField(null=False, default=0)
    contents=models.JSONField(null=False, default=dict)
    adds = models.JSONField(null=False, default=dict)

    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')

    def __str__(self):
        return f"{self.id}: {self.number}"