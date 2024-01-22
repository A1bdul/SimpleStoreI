import uuid
from django.contrib import admin
from django import forms
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.html import format_html
from collections.abc import Iterable
from django.utils.translation import gettext_lazy as _

# from colorfield.fields import ColorField
# Create your models here

from django.contrib.auth.models import AbstractUser
from django.db.models import Q, F, ExpressionWrapper, DecimalField, Case, When, Count


class ProductQuerySet(models.QuerySet):
    def filter_by_review(
        self,
        min_rating=None,
        order_by_rating_count=False,
        order_by_highest_rating=False,
    ):
        queryset = self.annotate(avg_rating=Avg("reviews__rating")).annotate(
            review_count=Count("reviews")
        )

        if min_rating is not None:
            queryset = queryset.filter(avg_rating__gte=min_rating)

        if order_by_rating_count:
            queryset = queryset.order_by("-avg_rating", "review_count")
        elif order_by_highest_rating:
            queryset = queryset.order_by("-avg_rating")
        else:
            queryset = queryset.order_by("avg_rating")

        queryset = queryset.filter(available__gte=0)

        return queryset

    def order_by_popularity(self):
        queryset = self.annotate(order_count=Count("ordered_items")).annotate(
            wishlist_count=Count("wishlisted_by")
        )

        queryset = queryset.order_by("-order_count", "-wishlist_count")
        queryset = queryset.filter(available__gte=0)

        return queryset

    def filter_by_price(
        self, min_price=None, max_price=None, order_by_calculated_price="asc"
    ):
        queryset = self.annotate(
            calculated_price=ExpressionWrapper(
                Case(
                    When(
                        discount__gt=0,
                        then=F("original_price")
                        - (F("original_price") * (F("discount") / 100)),
                    ),
                    default=F("original_price"),
                    output_field=DecimalField(),
                ),
                output_field=DecimalField(),
            )
        )

        if min_price is not None:
            queryset = queryset.filter(calculated_price__gte=min_price)

        if max_price is not None:
            queryset = queryset.filter(calculated_price__lte=max_price)

        if order_by_calculated_price == "asc":
            queryset = queryset.order_by("calculated_price")
        elif order_by_calculated_price == "desc":
            queryset = queryset.order_by("-calculated_price")

        queryset = queryset.filter(available__gt=0)

        return queryset

    def shopping_filters(
        self, size, category, sort_order, max_price, min_price, *args, **kwargs
    ):
        queryset = self.filter_by_price(min_price, max_price, sort_order)
        if size:
            queryset = queryset.filter(size=size)
        if category:
            queryset = queryset.filter(category__name__icontains=category)

        return queryset


class ProductManager(models.Manager):
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def filter_by_price(self, min_price, max_price):
        return self.get_queryset().filter_by_price(min_price, max_price)

    def order_by_popularity(self):
        return self.get_queryset().order_by_popularity()

    def shopping_filters(
        self, min_price=None, max_price=None, size=None, category=None, sort_order="asc"
    ):
        return self.get_queryset().shopping_filters(
            min_price=min_price,
            max_price=max_price,
            size=size,
            category=category,
            sort_order=sort_order,
        )


# Create your models here.
class User(AbstractUser):
    """Django's default user model is extended for this wish list option for active user,
    Shipping Address for user is saved from checkout process
    """

    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=200)
    wish_list = models.ManyToManyField(
        "Product", related_name="wishlisted_by", blank=True
    )
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
        "Product", on_delete=models.CASCADE, related_name="ordered_items", null=True
    )
    quantity = models.IntegerField(default=1)
    consumer = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    ordered_at = models.DateTimeField(auto_now_add=True)

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
        "Category", verbose_name=_("category"), on_delete=models.CASCADE
    )
    from pyuploadcare.dj.models import ImageGroupField

    image = ImageGroupField(blank=True, null=True)
    available = models.PositiveIntegerField(default=1)
    original_price = models.FloatField()
    label = models.CharField(max_length=10, choices=LABEL_TYPES, blank=True)
    description = models.TextField()
    color = ArrayField(
        models.ImageField(upload_to="your_image_folder/"),
        blank=True,
        null=True,
        size=5,  # Set the maximum number of images to allow
    )
    discount = models.FloatField(blank=True, null=True)
    discount_duration = models.DateTimeField(blank=True, null=True)

    objects = ProductManager()

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

    def clean(self):
        if self.discount and not self.discount_duration:
            self.discount_duration = timezone.now() + timezone.timedelta(hours=24)

        if not self.discount and self.discount_duration:
            raise ValidationError(
                "Cannot set discount duration without providing a discount"
            )

        if self.discount_duration:
            if self.discount_duration < timezone.now():
                raise ValidationError("Discount datetime cannot be in the past")

            time_difference = self.discount_duration - timezone.now()
            if (
                time_difference.seconds < 3600
            ):  # Check if the duration is at least an hour
                raise ValidationError("Discount duration should be at least an hour")

        super(Product, self).clean()

    @admin.display(description="")
    def image_display(self):
        if not self.image:
            display_image = "/static/thumbnail.jpg"
        else:
            display_image = self.image[0].cdn_url
        return format_html('<img src="{}" width="30">', display_image)

    def price(self):
        if self.discount:
            return self.original_price - (self.original_price * (self.discount / 100))
        return self.original_price

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
        *args,
        **kwargs,
    ) -> None:
        self.name = self.name.title()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Review(models.Model):
    product = models.ForeignKey(
        Product, related_name="comments", on_delete=models.CASCADE
    )
    reply = models.ForeignKey(
        "Review",
        null=True,
        blank=True,
        related_name="replies",
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(User, verbose_name=_("user"), on_delete=models.CASCADE)
    content = models.TextField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    rating = models.DecimalField(max_digits=1, decimal_places=1)

    def __str__(self):
        return "{} on {}".format(self.name, self.product)

    def rating_percentage(self, product):
        product_reviews = Review.objects.filter(product=product)
        total_reviews = product_reviews.count()
        if total_reviews > 0:
            avg_rating = product_reviews.aggregate(Avg("rating"))["rating__avg"]
            if avg_rating:
                rating_percentage = (avg_rating / 5) * 100  # Assuming a scale of 1 to 5
                return round(rating_percentage, 2)
        return 0
