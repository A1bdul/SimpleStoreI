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
from Marketplace.settings import BASE_DIR

# Create your models here


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
        path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__), "..", f"products/{self.name.lower()}"
            )
        )
        if not os.path.exists(path=path):
            os.makedirs(path)
        html = render_to_string("product.html", {"instance": self})
        with open(path, "w") as file:
            file.write(html)

    def delete(
        self, using: Any = ..., keep_parents: bool = ...
    ) -> tuple[int, dict[str, int]]:
        path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__), "..", f"products/{self.name.lower()}"
            )
        )
        if not os.path.exists(path=path):
            os.makedirs(path)
        if os.path.exists(path) and os.path.isdir(path):
            shutil.rmtree(path)
        return super().delete(using, keep_parents)

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
        path = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__), "..", f"product-category/{self.name.lower()}"
            )
        )
        if not os.path.exists(path=path):
            os.makedirs(path)
        html = render_to_string(
            "layouts/category.html",
            {"instance": self, "request": HttpRequest},
        )
        with open(os.path.join(path, "index.html"), "w") as file:
            file.write(html)

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
