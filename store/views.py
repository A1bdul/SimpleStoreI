from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from .models import Product
# Create your views here.


def get_cart_hash():
    return ""


class AdminView(APIView):
    def post(self, request, format=None) -> Response:
        action = request.data.get("action", "")
        ## if not action: print("\n\naction:", request.data)
        ajax_action = request.query_params.get("wc-ajax")
        if ajax_action:
            print(str(request.data) + '\n\n', ajax_action)
            shopping_cart_fragment = render_to_string(
                "fragments/widget_shopping_cart_content.html"
            )
            return Response(
                {
                    "cart_hash": get_cart_hash(),
                    "fragments": {
                        "div.widget_shopping_cart_content": shopping_cart_fragment,
                        ".cart-toggle .cart-price": '<span class="cart-price"….00</bdi></span></span>',
                        ".cart-toggle .cart-count": '<span class="cart-count">0</span>',
                    },
                }
            )
        if action == "wolmart_load_menu":
            top_navigation = render_to_string("fragments/top-navigation.html")
            categories_menu = render_to_string("fragments/categories-menu.html")
            main_menu = render_to_string("fragments/main-menu.html")
            footer_nav_1 = render_to_string("fragments/footer-nav-1.html")
            footer_nav_2 = render_to_string("fragments/footer-nav-2.html")
            footer_nav_3 = render_to_string("fragments/footer-nav-3.html")

            return Response({
                    "top-navigation": top_navigation,
                    "categories": categories_menu,
                    "main-menu": main_menu,
                    "footer-nav-1": footer_nav_1,
                    "footer-nav-2": footer_nav_2,
                    "footer-nav-3": footer_nav_3
                })

        if action == "wolmart_account_form":
            return render(request, "fragments/popup-account-form.html")

        if action == "wolmart_quickview":
            # item = get_object_or_404(Product, pk=request.data.get("product_id"))
            return render(request, "fragments/quick-view.html", {
                    "item": ""
                })

        if action == "wolmart_add_to_compare":
            popup_template = render_to_string("fragments/compare-popup-template.html")
            minicompare = render_to_string("fragments/mini-compare.html")
            return Response({
                    "url": "",
                    "count": 1,
                    "products": [request.data.get("id")],
                    "popup_template": popup_template,
                    "minicompare": minicompare
                })
        return Response({"result": False})
