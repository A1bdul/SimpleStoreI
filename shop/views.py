from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework import views, renderers
from store.serializer import ProductSerializer
from rest_framework.response import Response
from store.models import Product
from urllib.parse import unquote
from django.urls import resolve
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
    page_size = 9  # Default to 9
    page_query_param = 'page_number'  # Define the page URL parameter
    page_size_query_param = "count"  # Allow the client to change the page size
    max_page_size = 36  # Maximum limit allowed when requested by client

    def paginate_queryset(self, queryset, request, view=None):
        page_number = int(resolve(request.path_info).kwargs.get("page_number", 1))  # Extract page number from URL path
        self.page = page_number
        return super().paginate_queryset(queryset, request, view)


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


class ShopView(views.APIView):
    queryset = Product.objects.filter(available__gte=0)
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    # renderer_classes = [renderers.TemplateHTMLRenderer]
    # template_name = "shop.html"

    def post(self, request):
        # Avoid using sleep in production code
        # time.sleep(2)
        if "pagination" in request.data:
            page_number = request.data.get("args[paged]")
            try:
                page_number = int(page_number)
            except ValueError:
                return JsonResponse({"error": "Invalid page number"}, status=status.HTTP_400_BAD_REQUEST)

            paginated_queryset = self.paginate_queryset(self.queryset, page_number)  # Pass the page_number here
            if paginated_queryset is not None:
                # Pagination logic can remain the same...
                serializer = self.serializer_class(paginated_queryset, many=True)
                context = {
                    'data': serializer.data,
                    'showtype': "grid"  # Example context data
                }
                return render(request, "shop.html", context)
            else:
                return Response(
                    "Invalid page number or no paginated data found",
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return render(request, "shop.html")

    @property
    def paginator(self):
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset, page_number=1):
        if self.paginator is None:
            return None

        page_size = self.request.query_params.get("count", 12)
        if not page_size:
            return None

        self.page = page_number

        if len(self.queryset) > 1:
            self.paginator = self
            return list(self.queryset[self.page_size * (self.page - 1):self.page_size * self.page])

        return self.paginator.paginate_queryset(self.queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, category=None, page_number=None, *args, **kwargs):
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
        page = self.paginate_queryset(self.queryset)
        if page  is not None:
            serializer = self.serializer_class(page, many=True)
            response = self.get_paginated_response(serializer.data)
        else:
            response = self.serializer_class(self.queryset, many=True)
        response.data["showtype"] = showtype
        print("data", request)
        return render(request, "shop.html", response.data)
