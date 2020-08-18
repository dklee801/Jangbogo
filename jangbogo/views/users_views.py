from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from jangbogo.models import User, Purchase
from django.core import serializers
import json
import requests
from jangbogo.forms import UserForm


def getServiceKey():
    api_key = "PHjGpBCxONS4DpfJDngspSXPSibgR8%2BWvAcHdqo3zkx%2F3ok5oheb3DR3bpvEfNrTRErQF709yp18hHtVcXnqqg%3D%3D"
    api_key_decode = requests.utils.unquote(api_key)
    parameters = {"serviceKey":api_key_decode, "numOfROws":10, "pageNo":1}
    return parameters

# Create your views here.


def logIn(request):
    if request.method == 'POST':
        try:
            user = User.objects.get(
                user_name= request.POST['user_name']
            )

        except User.DoesNotExist:
            error_message = '아이디가 없습니다.'
            return render(request,'users/login_register.html',{'error_message' : error_message})

        else:
            if user.user_password != request.POST['user_password']:
                error_message = '비밀번호가 틀렸습니다.'
                return render(request, 'users/login_register.html', {'error_message': error_message})

            else:
                context = {
                'user':user
                }
                return render(request,'home.html', context = context)
    else:
         pass


def logOut(request):
    return true

def signUp(request):

    if request.method == 'POST':
        user_name = request.POST['user_name']
        user_password = request.POST['user_password']
        user_email = request.POST['user_email']
        try:
            User.objects.get(user_name=user_name)

        except User.DoesNotExist:
            success_message = '아이디가 생성 되었습니다.'
            User.objects.create(user_name=user_name, user_password=user_password, user_email=user_email)
            return render(request,'home.html',{'success_message' : success_message})

        else:
            error_message = '이미 존재하는 아이디 입니다.'
            return render(request,'users/login_register.html',{'error_message' : error_message})

    else:
        return render(request, 'home.html')



def loginRegister(request):
    user_form = UserForm(request.POST);
    return render(request, 'users/login_register.html', {"user_form": user_form})

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
