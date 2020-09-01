from django.db import models
import datetime

# Create your models here.
class User(models.Model):
    user_name = models.CharField('아이디', max_length=20)
    user_password = models.CharField('패스워드', max_length=20)
    user_email = models.EmailField('이메일', max_length=40)
    user_registerdate = models.DateTimeField('가입일자', auto_now_add=True)

    def __str__(self):
        return self.user_name


class Purchase(models.Model):
    pur_user = models.ForeignKey(User, on_delete=models.CASCADE)
    pur_name = models.CharField('제품명', max_length=40)
    pur_jejo_num = models.CharField('제품제조번호', max_length=15)
    pur_company = models.CharField('제조업체명', max_length=40)
    pur_date = models.DateTimeField('구매일자', default=datetime.datetime.now())
    pur_jejodate = models.DateTimeField('제조일자', default=datetime.datetime.now())
    pur_expire_period = models.CharField('유통기한', max_length=10, default=12)
    pur_or_jejo = models.CharField('유통기한 기준', max_length=10, default="pur")

    def __str__(self):
        return self.pur_name

class SearchKeywordDetail(models.Model):
    search_user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_name = models.CharField('제품명', max_length=40)
    search_rtrvlprvns = models.CharField('회수사유', max_length=100)
    search_company_nm = models.CharField('제조업체명', max_length=40)
    search_company_addr = models.CharField('업체주소', max_length=40)
    search_company_telno = models.CharField('전화번호', max_length=10)
    search_frmlcunit = models.CharField('포장단위', max_length=10)
    search_jejodate = models.CharField('제조일자', max_length=20)
    search_rtrvlmthd = models.CharField('회수방법', max_length=20, default="자율회수")
    search_expire_period = models.CharField('유통기한', max_length=40)
    search_prdlst_type = models.CharField('식품분류', max_length=40)
    search_img_file_path = models.URLField('제품사진', max_length=10)
    search_prdlst_cd = models.CharField('품목코드', max_length=40)
    search_cret_dtm = models.DateTimeField('등록일', default=datetime.datetime.now())
    search_rtrvldsuse_seq = models.CharField('회수.판매중지 일련번호', max_length=40)
    search_prdlst_report_no = models.CharField('품목제조보고번호', max_length=40)
    search_rtrvl_grdcd_nm = models.CharField('회수등급', max_length=10)
    search_prdlst_cd_nm = models.CharField('품목유형(품목코드명)', max_length=10)

    def __str__(self):
        return self.search_name