# Generated by Django 4.2.5 on 2023-10-30 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0035_alter_inventory_create_ux_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventory',
            name='attributes',
            field=models.ManyToManyField(blank=True, to='inventory.attributes'),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='create_ux',
            field=models.BigIntegerField(default=1698673409),
        ),
        migrations.AlterField(
            model_name='unit',
            name='create_ux',
            field=models.BigIntegerField(default=1698673409),
        ),
    ]