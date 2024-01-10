from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework import views, renderers, status
from store.serializer import ProductSerializer
from rest_framework.response import Response
from store.models import Product
from rest_framework.permissions import AllowAny
from urllib.parse import unquote
from django.urls import resolve
from django.http import HttpResponseNotFound
import time
import json

# Create your views here.


def index(request):
    return render(request, "index.html")


def cart_view(request):
    return render(request, "cart.html")

def markethandler404(request, exception, template_name="404.html"):
    response = render(request,template_name)
    response.status_code = 404
    return response

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

    def get_next_link(self):
        if not self.page.has_next():
            return None
        page_number = self.page.next_page_number()
        return self._get_link(page_number)

    def get_previous_link(self):
        if not self.page.has_previous():
            return None
        page_number = self.page.previous_page_number()
        return self._get_link(page_number)

    def _get_link(self, page_number):
        request.path = reverse("shop", kwargs={"page_number": page_number})
        updated_url = "{}?{}".format(request.path, urlencode(params, doseq=True))

        return updated_url

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
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    permission_classes = [AllowAny]
    # renderer_classes = [renderers.TemplateHTMLRenderer]
    # template_name = "shop.html"

    def get_queryset(self):
        category = resolve(self.request.path_info).kwargs.get("category", None)

        min_price = self.request.query_params.get("min_price", None)
        max_price = self.request.query_params.get("max_price", None)
        filter_size = self.request.query_params.get("filter_size")
        query_set = Product.objects.shopping_filters(min_price=min_price, max_price=max_price, size=filter_size,
                                                     category=category)
        # queryset = self.get_queryset().order_by_popularity()
        return query_set

    def post(self, request):
        # Avoid using sleep in production code
        time.sleep(2)
        showtype = request.query_params.get("showtype", "grid")

        if "pagination" in request.data:
            page_number = request.data.get("args[paged]")

            page = self.paginate_queryset(self.get_queryset())  # Pass the page_number here
            if page :
                # Pagination logic can remain the same...
                serializer = self.serializer_class(page, many=True)
                response = self.get_paginated_response(serializer.data, page_number)
                response.data["showtype"] = showtype
                return render(request, "shop.html", response.da)
            else:
                return HttpResponseNotFound("")

            print("data", response.data)

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

        if len(self.get_queryset()) > 1:
            self.paginator = self
            return list(self.get_queryset()[self.page_size * (self.page - 1):self.page_size * self.page])

        return self.paginator.paginate_queryset(self.get_queryset(), self.request, view=self)

    def get_paginated_response(self, data, page_number=1):
        assert self.paginator is not None
        self.paginator.page.number = page_number
        return self.paginator.get_paginated_response(data)

    def get(self, request, category=None, page_number=None, *args, **kwargs):
        time.sleep(2)
        showtype = request.query_params.get("showtype", "grid")


        print("\n\nquery_parms", request.data, request.query_params)

        page = self.paginate_queryset(self.get_queryset())
        if page:
            serializer = self.serializer_class(page, many=True)
            response = self.get_paginated_response(serializer.data)
        else:
            return HttpResponseNotFound("Not found")
            # response = self.serializer_class(self.get_queryset(), many=True)
        response.data["showtype"] = showtype
        print("data", response.data)
        return render(request, "shop.html", response.data)
