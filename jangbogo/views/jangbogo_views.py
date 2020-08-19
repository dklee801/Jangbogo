from django.shortcuts import render, get_object_or_404
import requests, json
from jangbogo.models import User, SearchKeywordDetail
from django.http import HttpResponse

def getServiceKey():
    api_key = "gpFDETGQQkZ7IJKghdT8EoYzhLIVxt0kfO1krs5koYoIailm92SeDNwOP7kaaaJvtInLO7Ms8dhNcViK3Gv3tw%3D%3D"
    api_key_decode = requests.utils.unquote(api_key)
    return api_key_decode


def recallListSearch(request):
    search_key = request.POST.get('keyword', False)
    parameters = getServiceKey()
    return render(request, 'jangbogo/product_list.html', {'search_key': search_key, 'parameters': parameters})

def recallListDetail(request, recall_product_nm, recall_company_nm):
    recallDetail = SearchKeywordDetail.objects.get(search_name=recall_product_nm, search_company_nm=recall_company_nm)
    context = {
            'search_name': recallDetail.search_name,
            'search_rtrvlprvns': recallDetail.search_rtrvlprvns,
            'search_company_nm': recallDetail.search_company_nm,
            'search_company_addr': recallDetail.search_company_addr,
            'search_company_telno': recallDetail.search_company_telno,
            'search_frmlcunit': recallDetail.search_frmlcunit,
            'search_jejodate': recallDetail.search_jejodate,
            'search_rtrvlmthd': recallDetail.search_rtrvlmthd,
            'search_expire_period': recallDetail.search_expire_period,
            'search_prdlst_type': recallDetail.search_prdlst_type,
            'search_img_file_path': recallDetail.search_img_file_path,
            'search_prdlst_cd': recallDetail.search_prdlst_cd,
            'search_cret_dtm': recallDetail.search_cret_dtm,
            'search_rtrvldsuse_seq': recallDetail.search_rtrvldsuse_seq,
            'search_prdlst_report_no': recallDetail.search_prdlst_report_no,
            'search_rtrvl_grdcd_nm': recallDetail.search_rtrvl_grdcd_nm,
            'search_prdlst_cd_nm': recallDetail.search_prdlst_cd_nm,
    }
    return render(request, 'jangbogo/product_detail.html', context)

def saveRecallDetail(request):
    try:
        SearchKeywordDetail.objects.get(search_name=request.POST["prdtnm"], search_company_nm=request.POST["bsshnm"])

    except (KeyError, SearchKeywordDetail.DoesNotExist):
        try:
            user = User.objects.get(pk=request.session['user'])
        except (KeyError, User.DoesNotExist):
            user = User.objects.get(user_name="guest")

        recallDetail = SearchKeywordDetail.objects.create(
            search_user=user,
            search_name=request.POST["prdtnm"],
            search_rtrvlprvns=request.POST["rtrvlprvns"],
            search_company_nm=request.POST["bsshnm"],
            search_company_addr=request.POST["addr"],
            search_company_telno=request.POST["prcscitypoint_telno"],
            search_frmlcunit=request.POST["frmlcunit"],
            search_jejodate=request.POST["mnfdt"],
            search_rtrvlmthd=request.POST["rtrvlplandoc_rtrvlmthd"],
            search_expire_period=request.POST["distbtmlmt"],
            search_prdlst_type=request.POST["prdlst_type"],
            search_img_file_path=request.POST["img_file_path"],
            search_prdlst_cd=request.POST["prdlst_cd"],
            search_cret_dtm=request.POST["cret_dtm"],
            search_rtrvldsuse_seq=request.POST["rtrvldsuse_seq"],
            search_prdlst_report_no=request.POST["prdlst_report_no"],
            search_rtrvl_grdcd_nm=request.POST["rtrvl_grdcd_nm"],
            search_prdlst_cd_nm=request.POST["prdlst_cd_nm"],
        )
        recallDetail.save()
        message = '상세내용 저장완료'
    else:
        message = '이미 존재해서 저장할 필요없음'

    context = {
        'message': message
    }
    return HttpResponse(json.dumps(context), content_type="application/json")

def productListAll(request):
    return true

def productListSearch(request):
    search_key = request.POST.get('keyword', '')
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

