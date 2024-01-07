from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from store.serializer import ProductSerializer
from rest_framework.response import Response
from store.models import Product
from urllib.parse import unquote
import time
import json

# Create your views here.


def index(request):
    return render(request, "index.html")


def cart_view(request):
    return render(request, "cart.html")


@api_view(["GET", "POST"])
def compare_view(request):
    compare_cookie = request.COOKIES.get('wolmart_compare_list_4', '[]')
    compare_list = json.loads(unquote(compare_cookie))
    print("comapre list",compare_list)
    # items = Product.objects.filter(id__in=compare_list)
    items = [1]
    return render(request, "compare.html",{
            "items": items
        })


class ProductPagination(PageNumberPagination):
    page_size = 12  # Default to 12
    page_size_query_param = "page_size"  # Allow the client to change the page size
    max_page_size = 36  # Maximum limit allowed when requested by client

    def get_paginated_response(self, data):
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "current_page": self.page.number,
                "start_index": self.page.start_index(),
                "end_index": self.page.end_index(),
                "results": data,
            }
        )


class ShopView(ListAPIView):
    queryset = Product.objects.filter(available__gte=0)
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def post(self, request):
        print(request.data)
        time.sleep(3)
        return render(request, "layouts/page.html")

    def get(self, request, category=None, *args, **kwargs):
        time.sleep(2)
        showtype = request.query_params.get("showtype", "grid")

        print("\n\nquery_parms", request.data, request.query_params)
        if category:
            self.queryset = self.queryset.filter(category__name__in=category)
        if request.query_params:
            min_price = request.query_params.get("min_price", None)
            max_price = request.query_params.get("max_price", None)
            filter_size = request.query_params.get("filter_size")
            order_by = request.query_params.get("orderby")

        self.queryset = self.queryset.order_by_popularity()
        response = super().get(request, *args, **kwargs)
        response.data["showtype"] = showtype
        return render(request, "shop.html", response.data)
