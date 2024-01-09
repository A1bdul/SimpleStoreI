from rest_framework import serializers
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    pass

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name']
