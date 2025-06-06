"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render
from django.urls import re_path
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

def index_view(request):
    return render(request, "dist/index.html")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("myapp/", include("myapp.urls")),
    re_path(r'^(?!api|admin|static|media).*$', csrf_exempt(TemplateView.as_view(template_name='index.html'))),

]
