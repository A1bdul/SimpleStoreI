# Generated by Django 5.0 on 2024-01-02 06:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordereditem',
            name='item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ordered_item', to='store.product'),
        ),
        migrations.AddField(
            model_name='user',
            name='wish_list',
            field=models.ManyToManyField(to='store.product'),
        ),
    ]
