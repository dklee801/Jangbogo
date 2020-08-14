from django.shortcuts import render

# Create your views here.

def recallListAll(request):
    return render(request, 'jangbogo/product_list.html')

def recallListSearch(request, recall_product_nm):
    return true

def recallListDetail(request, recall_product_id):
    return render(request, 'jangbogo/product_detail.html')

def productListAll(request):
    return true

def productListSearch(request, product_nm):
    return true

def productListDetail(request, product_id):
    return true

def falseListAll(request):
    return true

def falseListSearch(request, false_product_nm):
    return true

def falseListDetail(request, false_product_id):
    return true

