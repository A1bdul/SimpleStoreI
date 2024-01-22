from rest_framework import serializers
from .models import Product, Category, Review, OrderedItem


class CategorySerializer(serializers.ModelSerializer):
    pass

class ProductSerializer(serializers.ModelSerializer):
    rating_percentage = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    # price = serializers.SerializerMethodField()
    category = serializers.SlugRelatedField(
            read_only = True,
            slug_field = 'name'
        )
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'category', 'rating_percentage', 'rating_count', 'price']

    def get_rating_percentage(self, obj):
        reviews = Review()
        return reviews.rating_percentage(product=obj)

    def get_rating_count(self, obj):
        return Review.objects.filter(product=obj).count()

    def get_image(self, obj):
        return [img.cdn_url for img in obj.image]

    # def get_price(self, obj):
    #     price = obj.price()
    #     print(price)
    #     return price


class OrderedItemSerializer:

    def __init__(self, instance):
        self.instance = instance
        self.data = self.get_serialized_data()

    def serialize_order(self):
        items = []
        if self.instance:
            print(self.instance)
            for ordered_item in self.instance:
                item = ProductSerializer(Product.objects.get(id=ordered_item.get("id"))).data
                item["quantity"] = ordered_item.get("quantity", 1)
                item["ordered_item_total"] =  item.get("price") * int(item.get("quantity"))
                items.append(item)

        return items

    def get_serialized_data(self):
        data = {"total_price": 0, "total_quantity": 0}
        items = self.serialize_order()
        for item in items:
            data["total_price"] += item.get("ordered_item_total", 0.00)
            data["total_quantity"] += item.get("quantity")

        data["items"] = items
        return data
