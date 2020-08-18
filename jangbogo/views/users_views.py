from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from jangbogo.models import User, Purchase
from django.core import serializers
import json, re, requests

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
    user = get_object_or_404(User, pk=user_id)
    hasProductList = user.purchase_set.all()
    context = {
        'hasProductList' : hasProductList,
    }
    return render(request, 'jangbogo/notice_board.html', context)
