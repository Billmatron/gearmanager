# Generated by Django 4.2.5 on 2023-10-27 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0025_alter_inventory_create_ux_alter_unit_create_ux_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='create_ux',
            field=models.BigIntegerField(default=1698427993),
        ),
        migrations.AlterField(
            model_name='unit',
            name='create_ux',
            field=models.BigIntegerField(default=1698427993),
        ),
    ]