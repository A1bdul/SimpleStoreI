from django.shortcuts import render
from django.http.response import JsonResponse
from django.template.loader import render_to_string


# Create your views here.
def index(request):
    return render(request, "index.html")

def cart_view(request):
    return render(request, 'cart.html')

def shop_view(request):
    return render(request, 'shop.html')
