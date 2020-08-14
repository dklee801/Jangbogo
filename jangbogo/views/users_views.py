from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from jangbogo.models import User, Purchase
from django.core import serializers
import json
import requests

def getServiceKey():
    api_key = "PHjGpBCxONS4DpfJDngspSXPSibgR8%2BWvAcHdqo3zkx%2F3ok5oheb3DR3bpvEfNrTRErQF709yp18hHtVcXnqqg%3D%3D"
    api_key_decode = requests.utils.unquote(api_key)
    parameters = {"serviceKey":api_key_decode, "numOfROws":10, "pageNo":1}
    return parameters

# Create your views here.
def logIn(request):
    return true

def logOut(request):
    return true

def signUp(request):
    return true

def loginRegister(request):
    return render(request, 'users/login_register.html')

def userInfo(request, user_id):
    return render(request, 'users/mypage.html')

def hasProduct(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    hasProductList = user.purchase_set.all()
    urlInfo = getServiceKey()
    context = {
        'hasProductList' : serializers.serialize('json', hasProductList),
        'urlInfo' : urlInfo
    }
    return HttpResponse(json.dumps(context), content_type="application/json")

def addProduct(request, user_id, product_id):
    return true

def deleteProduct(request, user_id, product_id):
    return true

def noticeBoard(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    hasProductList = user.purchase_set.all()
    context = {
        'hasProductList' : hasProductList,
    }
    return render(request, 'jangbogo/notice_board.html', context)
