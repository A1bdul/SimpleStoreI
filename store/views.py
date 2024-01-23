import json
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from .models import Product
import urllib.parse
from shop.util import MarketList, cart_update
from .serializer import ProductSerializer
from shop.context_processors import marketplace_context
from django.conf import settings
# Create your views here.


class AdminView(APIView):

    def get(self, request, *args, **kwargs) -> Response:
        action = request.query_params.get("action")

        if action == "wolmart_ajax_search":
            query = action = request.query_params.get("query")

    def post(self, request, format=None) -> Response:
        action = request.data.get("action", "")
        ## if not action: print("\n\naction:", request.data)
        ajax_action = request.query_params.get("wc-ajax")
        if ajax_action:
            from django.core import signing

            empty_cart = signing.dumps([])
            cart_hash = request.session.get(settings.COOKIE_CART, "")

            cart_hash = empty_cart if cart_hash == "" else cart_hash
            cart = signing.loads(cart_hash)

            if ajax_action == "add_to_cart":
                try:
                    cart = cart_update(cart, request.data, ajax_action)
                except Exception as e:
                    print(e)

            if ajax_action == "remove_from_cart":
                product_id = signing.loads(request.data.get("cart_item_key"))
                try:
                    cart = cart_update(cart, {"product_id": int(product_id)},
                                       ajax_action)
                    print(cart)
                except Exception as e:
                    print(e)

            cart_hash = signing.dumps(cart)
            request.session[settings.COOKIE_CART] = cart_hash

            cart = marketplace_context(request)
            shopping_cart_fragment = render_to_string(
                "fragments/widget_shopping_cart_content.html", cart)

            return Response({
                "cart_hash": cart_hash,
                "fragments": {
                    "div.widget_shopping_cart_content":
                    shopping_cart_fragment,
                    ".cart-toggle .cart-price":
                    f'<span class="cart-price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#36;</span>{cart["cart"].get("total_price")}</bdi></span></span>',
                    ".cart-toggle .cart-count":
                    f'<span class="cart-count">{cart["cart"].get("total_quantity")}</span>',
                },
            })

        if action == "wolmart_load_mobile_menu":
            return render(request, "fragments/mobile-menu.html")

        if action == "wolmart_load_menu":
            top_navigation = render_to_string("fragments/top-navigation.html")
            categories_menu = render_to_string(
                "fragments/categories-menu.html")
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
                "footer-nav-3": footer_nav_3,
            })

        if action == "wolmart_account_form":
            return render(request, "fragments/popup-account-form.html")

        if action == "wolmart_quickview":
            item = get_object_or_404(Product,
                                     pk=request.data.get("product_id"))
            return render(request, "fragments/quick-view.html", {"item": item})

        if action == "wolmart_clean_compare":
            response = Response()
            response.delete_cookie("wolmart_compare_list_4")

            return response
        if action == "wolmart_remove_from_compare":
            cookie = request.COOKIES.get("wolmart_compare_list_4",
                                         json.dumps([], separators=(",", ":")))
            compare_list = json.loads(urllib.parse.unquote(cookie))
            try:
                compare_list.remove(int(request.data.get("id")))
            except ValueError:
                pass
            products = Product.objects.filter(id__in=compare_list)

            popup_template = render_to_string(
                "fragments/compare-popup-template.html",
                {"compare_list": products})
            minicompare = render_to_string("fragments/mini-compare.html")

            response = Response({
                "url": "",
                "count": len(compare_list),
                "products": compare_list,
                "popup_template": popup_template,
                "minicompare": minicompare,
            })
            if not request.data.get("mini_compare"):
                response.data["comapre-table"] = render_to_string(
                    "layouts/compare-table.html", {})
            response.set_cookie(
                "wolmart_compare_list_4",
                urllib.parse.quote(
                    json.dumps(compare_list, separators=(",", ":"))),
            )
            return response

        if action == "wolmart_add_to_compare":
            cookie = request.COOKIES.get("wolmart_compare_list_4",
                                         json.dumps([], separators=(",", ":")))
            cookie = json.loads(urllib.parse.unquote(cookie))
            cookie.append(int(request.data.get("id")))
            products = Product.objects.filter(id__in=cookie)
            compare_list = MarketList(settings.COMPARE_LIMIT)
            for product in products:
                compare_list.append(ProductSerializer(product).data)
            compare_list = compare_list.to_dict()

            popup_template = render_to_string(
                "fragments/compare-popup-template.html",
                {"compare_list": compare_list})
            minicompare = render_to_string("fragments/mini-compare.html")

            response = Response({
                "url": "",
                "count": compare_list["count"],
                "products": cookie,
                "popup_template": popup_template,
                "minicompare": minicompare,
            })
            response.set_cookie(
                "wolmart_compare_list_4",
                urllib.parse.quote(json.dumps(cookie, separators=(",", ":"))),
            )
            return response
        return Response({"result": False})
