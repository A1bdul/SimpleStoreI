# Generated by Django 5.0 on 2024-01-09 05:43

import pyuploadcare.dj.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_alter_ordereditem_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=pyuploadcare.dj.models.ImageGroupField(blank=True, null=True),
        ),
    ]
