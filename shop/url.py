from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("cart/", views.cart_view, name="cart"),
    path("compare/", views.compare_view, name="compare"),
    path("category/<str:category>/", views.ShopView.as_view(), name="category"),
    re_path(
       r"^shop/(?:page/(?P<page_number>\d+)/)?",
        views.ShopView.as_view(),
        name="shop",
    ),
]
# handler404 = views.markethandler404
