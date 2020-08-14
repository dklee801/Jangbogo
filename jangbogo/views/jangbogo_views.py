from django.shortcuts import render
import requests

def getServiceKey():
    api_key = "gpFDETGQQkZ7IJKghdT8EoYzhLIVxt0kfO1krs5koYoIailm92SeDNwOP7kaaaJvtInLO7Ms8dhNcViK3Gv3tw%3D%3D"
    api_key_decode = requests.utils.unquote(api_key)
    return api_key_decode

def recallListAll(request):
    search_key = request.POST.get('keyword', False)
    parameters = getServiceKey()
    return render(request, 'jangbogo/product_list.html', {'search_key':search_key, 'parameters':parameters})

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

