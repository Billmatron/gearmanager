# Generated by Django 4.2.5 on 2023-11-02 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoice', '0010_alter_invoice_create_ux'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='create_ux',
            field=models.PositiveBigIntegerField(default=1698940390),
        ),
    ]
