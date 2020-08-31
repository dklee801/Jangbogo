from django.urls import path
from jangbogo.views import jangbogo_views

app_name = 'jangbogo'

urlpatterns = [
    path('recall_list/', jangbogo_views.recallListSearch, name="recallListSearch"), #제품명으로 검색 시 회수, 중단 제품 리스트 조회
    path('recall_list/detail/<str:recall_product_nm>/<str:recall_company_nm>/', jangbogo_views.recallListDetail, name="recallListDetail"), #회수.판매중단 제품 상세정보
    path('recall_list/saveDetail/', jangbogo_views.saveRecallDetail, name="saveRecallDetail"), #회수.판매중단 제품 상세정보
    path('product_list/', jangbogo_views.productListSearch, name="productListSearch"), #제품명으로 검색 시 제품 리스트 조회
]