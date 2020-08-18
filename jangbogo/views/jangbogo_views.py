from django.shortcuts import render
import requests

def getServiceKey():
    api_key = "gpFDETGQQkZ7IJKghdT8EoYzhLIVxt0kfO1krs5koYoIailm92SeDNwOP7kaaaJvtInLO7Ms8dhNcViK3Gv3tw%3D%3D"
    api_key_decode = requests.utils.unquote(api_key)
    return api_key_decode

#def recallListAll(request):
 #   search_key = request.POST.get('keyword', False)
  #  parameters = getServiceKey()
   # return render(request, 'jangbogo/product_list.html', {'search_key':search_key, 'parameters':parameters})

def recallListSearch(request):
    search_key = request.POST.get('keyword', False)
    parameters = getServiceKey()
    return render(request, 'jangbogo/product_list.html', {'search_key': search_key, 'parameters': parameters})

def recallListDetail(request):
    context = {
        "prdtnm": request.POST["prdtnm"],
        "rtrvlprvns": request.POST["rtrvlprvns"],
        "bsshnm": request.POST["bsshnm"],
        "addr": request.POST["addr"],
        "prcscitypoint_telno": request.POST["prcscitypoint_telno"],
        "brcdno": request.POST["brcdno"],
        "frmlcunit": request.POST["frmlcunit"],
        "mnfdt": request.POST["mnfdt"],
        "rtrvlplandoc_rtrvlmthd": request.POST["rtrvlplandoc_rtrvlmthd"],
        "distbtmlmt": request.POST["distbtmlmt"],
        "prdlst_type": request.POST["prdlst_type"],
        "img_file_path": request.POST["img_file_path"],
        "prdlst_cd": request.POST["prdlst_cd"],
        "cret_dtm": request.POST["cret_dtm"],
        "rtrvldsuse_seq": request.POST["rtrvldsuse_seq"],
        "prdlst_report_no": request.POST["prdlst_report_no"],
        "rtrvl_grdcd_nm": request.POST["rtrvl_grdcd_nm"],
        "prdlst_cd_nm": request.POST["prdlst_cd_nm"],
    }
    return render(request, 'jangbogo/product_detail.html', context)

def productListAll(request):
    return true

def productListSearch(request):
    search_key = request.POST.get('keyword', False)
    parameters = getServiceKey()
    return render(request, 'jangbogo/product_list.html', {'search_key': search_key, 'parameters': parameters})


def productListDetail(request, product_id):
    return true

def falseListAll(request):
    return true

def falseListSearch(request, false_product_nm):
    return true

def falseListDetail(request, false_product_id):
    return true

