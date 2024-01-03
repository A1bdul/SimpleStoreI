import os
import shutil
from typing import Any
from django.contrib import admin
from django import forms
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.html import format_html
from collections.abc import Iterable
from django.template.loader import render_to_string
from django.utils.translation import gettext_lazy as _
from django.http import HttpRequest
from django.conf import settings

# Create your models here

from django.contrib.auth.models import AbstractUser



# Create your models here.
class User(AbstractUser):
    """Django's default user model is extended for this wish list option for active user,
    Shipping Address for user is saved from checkout process
    """

    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=200)
    wish_list = models.ManyToManyField("Product", blank=True, null-True)
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
        "Product", on_delete=models.CASCADE, related_name="ordered_item", null=True
    )
    quantity = models.IntegerField(default=1)
    consumer = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def ordered_item_total(self):
        return self.item.price * self.quantity


class Cart(models.Model):
    items = models.ManyToManyField("OrderedItem", blank=True)
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


class ChoiceArrayField(ArrayField):
    def formfield(self, **kwargs):
        defaults = {
            "form_class": forms.MultipleChoiceField,
            "choices": self.base_field.choices,
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)


class Product(models.Model):
    """Product are the items which are the users primary interest in the website,
    - Product have a unique name, so they are distinguishable from each other
    """

    LABEL_TYPES = [
        ("NEW", "New"),
        ("SALE", "Sale"),
        ("FEATURED", "Featured"),
    ]

    name = models.CharField(max_length=200, unique=True)
    category = models.ForeignKey(
        "store.Category", verbose_name=_("category"), on_delete=models.CASCADE
    )
    # from pyuploadcare.dj.models import ImageGroupField

    image = models.ImageField(blank=True, null=True)
    available = models.PositiveIntegerField(default=1)
    original_price = models.FloatField()
    label = models.CharField(max_length=10, choices=LABEL_TYPES, blank=True)
    description = models.TextField()
    color = ArrayField(
        models.CharField(max_length=200, choices=LABEL_TYPES, blank=True),
        default=list,
        blank=True,
    )
    discount = models.FloatField(blank=True, null=True)

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
        *args,
        **kwargs,
    ):
        self.name = self.name.title()
        super(Product, self).save(*args, **kwargs)
       
    @admin.display(description="")
    def image_display(self):
        if not self.image:
            display_image = "/static/thumbnail.jpg"
        else:
            display_image = self.image[0].cdn_url
        return format_html('<img src="{}" width="30">', display_image)

    def price(self):
        if self.discount:
            return self.price - (self.price * (self.discount / 100))
        return self.price

    def __str__(self):
        return self.name


class Category(models.Model):
    parent = models.OneToOneField(
        "self",
        verbose_name=_("parent"),
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)

    def save(
        self,
        force_insert: bool = ...,
        force_update: bool = ...,
        using: str | None = ...,
        update_fields: Iterable[str] | None = ...,
        *args,
        **kwargs,
    ) -> None:
        self.name = self.name.title()
        super().save(*args, **kwargs)
        
    def __str__(self) -> str:
        return self.name


class Comment(models.Model):
    product = models.ForeignKey(
        Product, related_name="comments", on_delete=models.CASCADE
    )
    reply = models.ForeignKey(
        "Comment",
        null=True,
        blank=True,
        related_name="replies",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        "users.User", verbose_name=_("user"), on_delete=models.CASCADE
    )
    content = models.TextField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} on {}".format(self.name, self.product)
