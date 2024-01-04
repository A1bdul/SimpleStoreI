from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render

# Create your views here.


class AdminView(APIView):
    def post(self, request, format=None) -> Response:
        action = request.data.get("action", "")
        print("\n\naction:", request.data)
        if action == "wolmart_account_form":
            return render(request, "fragments/popup-account-form.html")

        return Response({"result": False})
