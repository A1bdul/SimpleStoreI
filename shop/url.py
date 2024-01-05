from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("cart/", views.cart_view, name="cart"),
    path("shop/", views.shop_view, name="shop")
               ]
