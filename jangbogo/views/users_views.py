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
    if request.method == 'POST':
        user_id = request.POST.get('username')
        user_pw = request.POST.get('password')

        if user_id and user_pw:
            user = User.objects.get(user_name=user_id)
            request.session['user'] = user.id
            return redirect('users:noticeBoard', user.id)
    else:
        pass

    return render(request, 'users/login_register.html')

def logOut(request):
    if request.session.get('user'):
        del(request.session['user'])
    return redirect('http://localhost:8000/')

def signUp(request):
    return true

def loginRegister(request):
    return render(request, 'users/login_register.html')

def userInfo(request, user_id):
    user = User.objects.get(id=user_id)
    return render(request, 'users/mypage.html', {'user':user})

def userUpdate(request, user_id):
    user = User.objects.get(id=user_id)
    if request.method == 'POST':
        user_password = request.POST.get('password')
        user_email = request.POST.get('email')

        if user_id and user_email:
            user.user_password = user_password
            user.user_email = user_email
            user.save()
            return redirect('users:userInfo', user.id)
    else:
        pass
    return render(request, 'users/mypage.html', {'user':user})

def userDelete(request, user_id):
    user = User.objects.get(id=user_id)
    if request.method == 'POST':
        if user.user_password == request.POST.get("current_password2"):
            user.delete()
            del(request.session['user'])
            return redirect('http://localhost:8000/')
        else:
            error_message = '이미 존재하는 이름입니다.'
            return redirect('users:userInfo', user.id)


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
    if request.session.get('user'):
        user = get_object_or_404(User, pk=user_id)
        hasProductList = user.purchase_set.all()
        context = {
            'hasProductList' : hasProductList,
        }
        return render(request, 'jangbogo/notice_board.html', context)
    else:
        return redirect('users:loginRegister')