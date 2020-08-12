from django.db import models

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
    pur_date = models.DateTimeField('구매일자', auto_now_add=True)
    pur_jejodate = models.DateTimeField('제조일자', auto_now_add=True)

    def __str__(self):
        return self.pur_user