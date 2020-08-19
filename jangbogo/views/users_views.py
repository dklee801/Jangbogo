from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from jangbogo.models import User, Purchase
from django.core import serializers
import json
import requests


import json, re, requests

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
            return render(request, 'users/login_register.html',{'error_message' : error_message})

        else:
            if user.user_password != request.POST['user_password']:
                error_message = '비밀번호가 틀렸습니다.'
                return render(request, 'users/login_register.html', {'error_message': error_message})

            else:
                request.session['user'] = user.id
                return redirect('users:noticeBoard', user.id)

    return render(request, 'users/login_register.html')

def logOut(request):
    if request.session.get('user'):
        del(request.session['user'])
    return redirect('http://localhost:8000/')

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
    return render(request, 'users/login_register.html')

def userInfo(request, user_id):
    user = User.objects.get(id=user_id)
    return render(request, 'users/mypage.html', {'user':user})

def userUpdate(request, user_id):
    user = User.objects.get(id=user_id)
    if request.method == 'POST':
        user_password = request.POST.get('password')
        user_email = request.POST.get('email')
        user_repassword = request.POST.get('re_password')
        user_curpassword = request.POST.get('current_password')
        if user.user_password == user_curpassword:
            if user_password != user_repassword:
                error_message = '비밀번호가 틀립니다.'
            elif user_id and user_email:
                user.user_password = user_password
                user.user_email = user_email
                user.save()
                return redirect('users:userInfo', user.id)
        else:
            error_message = '비밀번호가 틀립니다.'
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
            error_message = '비밀번호가 틀립니다.'
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

    try:
        user = get_object_or_404(User, pk=user_id)

        pur_name = request.POST["pur_name"]
       # pur_jejo_num =
        pur_company = request.POST["pur_company"]
        pur_date = request.POST["pur_date"]
        pur_jejodate = request.POST["pur_jejodate"]
        pur_expire_period = request.POST["pur_expire_period"]
        pur_jejo_num = request.POST["prdReportNo"]

        # 유통기한 조회 시, 제조인 경우 별도로 처리하기 !!
        if "년" in pur_expire_period:
            print("년")
            expire_period = "".join(re.findall('\d+', pur_expire_period))
            expire_period = int(expire_period) * 12

            print(expire_period)
        elif "제조" in pur_expire_period:
            print("제조로부터")
            expire_period = "".join(re.findall('\d+', pur_expire_period))
        else:
            print("일반")
            expire_period = "".join(re.findall('\d+', pur_expire_period))

        purchaseObj = Purchase.objects.create (
            pur_user=user,
            pur_name=pur_name,
            pur_company=pur_company,
            pur_date=pur_date,
            pur_jejodate=pur_jejodate,
            pur_expire_period=expire_period,
            pur_jejo_num=pur_jejo_num
        )


    except (KeyError, User.DoesNotExist):
        message = '오류가 발생하여 추가할 수 없습니다.'
    else:
        purchaseObj.save()
        message = '보유/구매목록에 추가했습니다.'

    context = {
        'message': message
    }
    return HttpResponse(json.dumps(context), content_type="application/json")

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