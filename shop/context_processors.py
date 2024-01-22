import json
from urllib.parse import unquote
from django.conf import settings
from django.core import signing
from store.serializer import OrderedItemSerializer

def marketplace_context(request):
    # Add your custom item to the context
    compare_cookie = request.COOKIES.get('wolmart_compare_list_4', '[]')
    compare_list = json.loads(unquote(compare_cookie))
    # compare_list = ProductSerializer(Product.objects.filter(id__in=compare_list), many=True).data
    empty_cart = signing.dumps([])

    cart_hash = request.session.get(settings.COOKIE_CART, empty_cart)
    print(signing.loads(cart_hash))
    cart = OrderedItemSerializer(instance=signing.loads(cart_hash)).data

    return {
        'compare_list': compare_list,
        'cart_hash_key': settings.COOKIE_CART,
        'cart':cart
        }
