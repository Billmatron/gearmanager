# Generated by Django 4.2.5 on 2023-10-29 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0031_alter_inventory_create_ux_alter_unit_create_ux'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='create_ux',
            field=models.BigIntegerField(default=1698610416),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='label',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='unit',
            name='create_ux',
            field=models.BigIntegerField(default=1698610416),
        ),
    ]
