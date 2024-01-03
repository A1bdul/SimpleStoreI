import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

from store.models import Product


# Create your models here.
class User(AbstractUser):
    """Django's default user model is extended for this wish list option for active user,
    Shipping Address for user is saved from checkout process
    """

    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=200)
    wish_list = models.ManyToManyField(Product)
    address_to = models.ForeignKey(
        "ShippingAddress", on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return self.email


class ShippingAddress(models.Model):
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=20)
    mobile_number = models.IntegerField(blank=True, null=True)
    address = models.CharField(max_length=200)
    zip = models.IntegerField(blank=True, null=True)


class OrderedItem(models.Model):
    item = models.ForeignKey(
        "store.Product", on_delete=models.CASCADE, related_name="ordered_item", null=True
    )
    quantity = models.IntegerField(default=1)
    consumer = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def ordered_item_total(self):
        return self.item.price * self.quantity


class Cart(models.Model):
    items = models.ManyToManyField(OrderedItem, blank=True)
    transaction_id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4)
    completed = models.BooleanField(default=False)
    date_ordered = models.DateTimeField(auto_now_add=True)
    processing = models.BooleanField(default=False)
    consumer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    notes = models.TextField(blank=True)
    shipping_to = models.ForeignKey(
        ShippingAddress, on_delete=models.SET_NULL, null=True, blank=True
    )

    def cart_total(self):
        total = sum([price.ordered_item_total() for price in self.items.all()])
        return total

    def quantity_total(self):
        return self.items.count()
