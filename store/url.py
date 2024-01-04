from django.urls import path
from . import views

urlpatterns = [path("store/api/", views.AdminView.as_view(), name="store-api")]
