from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic.base import TemplateView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url('about_us/', TemplateView.as_view(template_name='about_us.html'), name='aboutUs'),
    path('admin/', admin.site.urls),
    path('users/', include('jangbogo.urls.users_urls')),
    path('jangbogo/', include('jangbogo.urls.jangbogo_urls')),
]
