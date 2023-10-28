# Generated by Django 4.2.5 on 2023-10-27 17:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventory', '0025_alter_inventory_create_ux_alter_unit_create_ux_and_more'),
        ('client', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('create_ux', models.PositiveBigIntegerField(default=1698427630)),
                ('modified_df', models.DateField(auto_now=True)),
                ('start_df', models.DateField(blank=True)),
                ('end_df', models.DateField(blank=True)),
                ('shoot_days', models.PositiveSmallIntegerField(default=1)),
                ('three_day_week', models.BooleanField(default=False)),
                ('labor_total', models.PositiveIntegerField(default=0)),
                ('gear_total', models.PositiveIntegerField(default=0)),
                ('misc_total', models.PositiveIntegerField(default=0)),
                ('discount_value', models.PositiveIntegerField(default=0)),
                ('discount_percent', models.BooleanField(default=False)),
                ('content', models.JSONField(default='{"units": [], "labor": [], "misc": []}')),
                ('client', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='quotes', to='client.client')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quotes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Labor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('create_ux', models.PositiveBigIntegerField(default=1698427630)),
                ('type', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.types')),
            ],
        ),
    ]
