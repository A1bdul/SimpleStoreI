import json
import locale
import os

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.models import ShippingAddress
from .models import Customer, Product, Cart, AttributeValue, ProductAttribute

User = get_user_model()


class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = ['value']


class ProductAttributeSerializer(serializers.ModelSerializer):
    attribute = serializers.StringRelatedField()
    values = AttributeValueSerializer(many=True)

    class Meta:
        model = ProductAttribute
        fields = ['attribute', 'values']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    attributes = ProductAttributeSerializer(source='productattribute_set', many=True)
    price = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['name', 'price', 'id', 'label', 'description', 'category', 'attributes', 'ratings']

    def create(self, validated_data):
        attributes_data = validated_data.pop('productattribute_set')
        product = Product.objects.create(**validated_data)
        for attribute_data in attributes_data:
            values_data = attribute_data.pop('values')
            product_attribute = ProductAttribute.objects.create(product=product, **attribute_data)
            for value_data in values_data:
                AttributeValue.objects.create(product_attribute=product_attribute, **value_data)
        return product

    def get_ratings(self, obj: Product):
        return {
            'ratings': obj.average_rating(),
            'count': obj.rating_set.all().count()
        }

    def get_price(self, obj):
        country_code = 'NGN'
        with open(os.path.join(settings.BASE_DIR, 'countries.json'), encoding='utf-8') as file:
            COUNTRIES: dict = json.load(file)
            try:
                locale.setlocale(locale.LC_ALL, country_code)
            except locale.Error:
                return None
            currency_info = locale.localeconv()

            for country in COUNTRIES:
                if country['currency']['code'] == country_code:
                    currency = country['currency']['symbol']
            formatted_amount = locale.currency(obj.price, symbol=True, grouping=True)
            formatted_amount = formatted_amount.replace(currency_info['currency_symbol'], '')
            formatted_amount = formatted_amount.replace('+', '')
            formatted_amount = f'{currency} {formatted_amount}'
            return formatted_amount


class OrderedItemSerializer(serializers.ModelSerializer):
    item = ProductSerializer(read_only=True)


class CartSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'products', 'cart_total', 'quantity_total'
        ]

    def get_products(self, obj):
        data = []
        for x in obj.items.all():
            i = ProductSerializer(x.item).data
            i['quantity'] = x.quantity
            data.append(i)
        return data


class UserSerializer(serializers.ModelSerializer):
    # cart = serializers.SerializerMethodField()
    wish_list = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'wish_list',
        ]

    # def get_cart(self, obj):
    #     carts, created = Cart.objects.get_or_create(consumer=obj, processing=False)
    #     if carts is not None:
    #         return CartSerializer(carts).data
    #     return None

    def get_wish_list(self, obj):
        customer, created = Customer.objects.get_or_create(id=obj.id)
        return [ProductSerializer(product).data for product in customer.wish_list.all()]


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = [
            'address', 'city', 'zip', 'mobile_number',
        ]