from django.urls import path
from jangbogo.views import jangbogo_views

app_name = 'jangbogo'

urlpatterns = [
    path('recall_list/', jangbogo_views.recallListAll, name="recallListAll"), #회수.판매중단 리스트 전체 조회
    path('recall_list/<str:recall_product_nm>/', jangbogo_views.recallListSearch, name="recallListSearch"), #제품명으로 검색 시 회수, 중단 제품 리스트 조회
    path('recall_list/<int:recall_product_id>/detail/', jangbogo_views.recallListDetail, name="recallListDetail"), #회수.판매중단 제품 상세정보
    path('product_list/', jangbogo_views.productListAll, name="productListAll"), #제품 리스트 전체 조회
    path('product_list/<str:product_nm>/', jangbogo_views.productListSearch, name="productListSearch"), #제품명으로 검색 시 제품 리스트 조회
    path('product_list/<int:product_id>/detail/', jangbogo_views.productListDetail, name="productListDetail"), #제품 상세정보
    path('false_ad_list/', jangbogo_views.falseListAll, name="falseListAll"), #과장.허위광고 제품 리스트 전체 조회
    path('false_ad_list/<str:false_product_nm>/', jangbogo_views.falseListSearch, name="falseListSearch"), #제품명으로 검색 시 과장.허위광고 제품 리스트 조회
    path('false_ad_list/<int:false_product_id>/detail/', jangbogo_views.falseListDetail, name="falseListDetail"), #과장.허위광고 제품 상세 조회
]