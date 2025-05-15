from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = "myapp"
urlpatterns = [
    path("", views.index, name="index"),
    path("search/<int:search_id>/", views.search, name="search"),
    path("myroot/", views.myroot, name="root"),
    path("get_product/<int:product_id>/", views.get_product, name="get_product"),
    path("get_category/<str:category>/", views.recommend, name="recommend"),
    path("add_to_cart/<int:productId>/", views.addToCart, name="addToCart"),
    path("delete_from_cart/<int:product_id>/", views.deleteFromCart, name="deleteFromCart"),
    path("all_cart_items/", views.allCartItems, name="AllCartItems"),
    path("sign-me-up/", views.signUp, name="signUp"),
    path("log-me-in/", views.logIn, name="login"),
    path("logout/", views.logoutUser, name="logoutUser"),
    path("session/", views.session_view, name="session"),
    path("whoami/", views.whoami_view, name='whoami'),
    path("check_login/", views.check_login, name="check_login"),
    path('create-checkout-session/', views.create_checkout_session, name='create-checkout-session'),
    path("search/<str:product_name>/", views.searchProduct, name="search_product"),
    path("get_csrf_token/", views.get_csrf_token, name="getCSRFToken"),
    path("upload-profile-pic/", views.upload_profile_pic, name="upload_image"),
    path("update-profile/", views.update_profile, name="update_profile"),
    path("contact-us/", views.contactUs,name="contact-us"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)