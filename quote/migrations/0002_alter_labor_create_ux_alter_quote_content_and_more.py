# Generated by Django 4.2.5 on 2023-10-27 17:33

from django.db import migrations, models
import quote.models


class Migration(migrations.Migration):

    dependencies = [
        ('quote', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labor',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698427993),
        ),
        migrations.AlterField(
            model_name='quote',
            name='content',
            field=models.JSONField(default=quote.models.Quote.content_default),
        ),
        migrations.AlterField(
            model_name='quote',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698427993),
        ),
    ]