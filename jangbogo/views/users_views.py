from django.shortcuts import render, redirect

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
    return true

def addProduct(request, user_id, product_id):
    return true

def deleteProduct(request, user_id, product_id):
    return true

def noticeBoard(request, user_id):
    return render(request, 'jangbogo/notice_board.html')
