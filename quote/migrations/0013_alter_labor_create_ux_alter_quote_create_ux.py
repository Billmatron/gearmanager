# Generated by Django 4.2.5 on 2023-11-02 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quote', '0012_alter_labor_create_ux_alter_quote_create_ux'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labor',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698940390),
        ),
        migrations.AlterField(
            model_name='quote',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698940390),
        ),
    ]
