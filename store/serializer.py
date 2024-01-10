from rest_framework import serializers
from .models import Product, Category, Review

class CategorySerializer(serializers.ModelSerializer):
    pass

class ProductSerializer(serializers.ModelSerializer):
    rating_percentage = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['name', 'rating_percentage', 'rating_count']

    def get_rating_percentage(self, obj):
        reviews = Review()
        return reviews.rating_percentage(product=obj)

    def get_rating_count(self, obj):
        return Review.objects.filter(product=obj).count()
