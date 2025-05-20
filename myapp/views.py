from django.shortcuts import render, get_list_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import Product, SearchHistory, CartItem, Profile
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
import requests
import json
from urllib.parse import unquote
from django.utils import timezone
from django.conf import settings
from django.middleware.csrf import get_token
from django.core.mail import send_mail
import stripe


stripe.api_key = settings.STRIPE_SECRET_KEY

@ensure_csrf_cookie
def index(request):
    all_products = Product.objects.all()
    each_product = []
    for product in all_products:
        each_product.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "rating": product.rating,
            "image": product.main_image.url if product.main_image else None,
            "image1": product.sub_image1.url if product.sub_image1 else None,
            "image2": product.sub_image2.url if product.sub_image2 else None,
            "image3": product.sub_image3.url if product.sub_image3 else None,
            "image4": product.sub_image4.url if product.sub_image4 else None,
            "stock": product.stock,
            "price": product.price,
            "key_features": product.key_features,
            "created_at": product.created_at
        })
       
       
    
    return JsonResponse(each_product, safe=False)


def search(request, searched_id):
    # searched_data = get_list_or_404(Product, search_id = searched_id)
    # print(searched_data)
    response = requests.get("https://fakestoreapi.com/products")
    return JsonResponse(response)

@ensure_csrf_cookie
def get_csrf_token(request):
    my_csrf = get_token(request)
    return JsonResponse({"detail": "CSRF cookie set", "csrf_token": my_csrf})

def myroot(request):
    if request.method == 'GET':
        try:
            response = requests.get("https://fakestoreapi.com/products")
            data = response.json()

            for item in data:
                if not Product.objects.filter(name=item['title']).exists():
                    Product.objects.create(
                        name=item['title'],
                        price=item['price'],
                        description=item['description'],
                        category=item['category'],
                        main_image=item['image'],  # ensure this is a URLField
                        rating=item.get('rating', {}).get('rate', 0),
                    )
            return JsonResponse({'message': 'Data imported successfully'}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only GET allowed'}, status=405)
    
def get_product(request, product_id):
    my_product = get_list_or_404(Product, id=product_id)
    main_product = []
    main_product.append({
            "id": my_product[0].id,
            "name": my_product[0].name,
            "description": my_product[0].description,
            "category": my_product[0].category,
            "rating": my_product[0].rating,
            "image": my_product[0].main_image.url if my_product[0].main_image else None,
            "image1": my_product[0].sub_image1.url if my_product[0].sub_image1 else None,
            "image2": my_product[0].sub_image2.url if my_product[0].sub_image2 else None,
            "image3": my_product[0].sub_image3.url if my_product[0].sub_image3 else None,
            "image4": my_product[0].sub_image4.url if my_product[0].sub_image4 else None,
            "stock": my_product[0].stock,
            "price": my_product[0].price,
            "key_features": my_product[0].key_features,
            "created_at": my_product[0].created_at
    })
    return JsonResponse(main_product, safe=False)

def recommend(request, category):
    recommendations = get_list_or_404(Product, category=category)
    each_product = []
    for product in recommendations:
        each_product.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "rating": product.rating,
            "image": product.main_image.url if product.main_image else None,
            "image1": product.sub_image1.url if product.sub_image1 else None,
            "image2": product.sub_image2.url if product.sub_image2 else None,
            "image3": product.sub_image3.url if product.sub_image3 else None,
            "image4": product.sub_image4.url if product.sub_image4 else None,
            "stock": product.stock,
            "price": product.price,
            "key_features": product.key_features,
            "created_at": product.created_at
        })

    print(each_product)

    return JsonResponse(each_product, safe=False)

@login_required
@ensure_csrf_cookie
def addToCart(request, productId):
    product = Product.objects.get(id=productId)
    if CartItem.objects.filter(product=product, user=request.user).exists():
        return JsonResponse({"error": "The product is already exists"}, status=400)
    else:
        CartItem.objects.create(user=request.user, product=product)
        return JsonResponse({"message": "Successfully added the product"}, status=200)
    
    return JsonResponse({"error": "Something went wrong"}, status=400)


def deleteFromCart(request, product_id):
    CartItem.objects.filter(product__id=product_id).delete()
    return JsonResponse({"message": "Success"})


@login_required
def allCartItems(request):
    all_items = CartItem.objects.filter(user=request.user)
    each_product = []

    for product in all_items:
        each_product.append({
            "id": product.product.id,
            "name": product.product.name,
            "description": product.product.description,
            "price": product.product.price,
            "image": product.product.main_image.url if product.product.main_image else None,
            "quantity": product.quantity
        })
        
    return JsonResponse(each_product, safe=False)


@ensure_csrf_cookie
def create_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)      
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': data.get("name"),
                            'description': data.get("description"),
                            'images': [data.get("image")]
                        },
                        'unit_amount': data.get("amount") * 100,  # in cents
                    },
                    'quantity': data.get("quantity"),
                }],
                mode='payment',
                success_url='http://localhost:5173/success',
                cancel_url='http://localhost:5173/cancel',
            )

            return JsonResponse({'id': checkout_session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        

        
def searchProduct(request, product_name):
    products = Product.objects.filter(name__icontains=product_name)

    if not products.exists():
        return JsonResponse({"message": "No matching products found."}, status=404)

    category = products[0].category
    all_products = Product.objects.filter(category=category)

    # Serialize queryset to JSON
    products_json = [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "image": product.main_image.url if product.main_image else None,
        }
        for product in all_products
    ]

    return JsonResponse(products_json, safe=False)

@ensure_csrf_cookie
@require_POST
def logIn(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data.get("username")
    password = data.get("password")
    if username is None or password is None:
        return JsonResponse({"message": "Please provide username and password"})
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        my_user = User.objects.get(username=user)
        return JsonResponse({"message": "success", "userId": my_user.id, "email": my_user.email, "profile_pic": my_user.profile.profile_image.url if my_user.profile.profile_image else None, "phone_no": my_user.profile.phone if my_user.profile.phone else None})
    else:
        return JsonResponse({"message": "failure"})


@login_required
@ensure_csrf_cookie  # or use @ensure_csrf_cookie with proper frontend token
def upload_profile_pic(request):
    if request.method == "POST":
        user = request.user
        profile = user.profile  # assuming a OneToOne field with User

        if "profile_pic" in request.FILES:
            profile.profile_image = request.FILES["profile_pic"]
            profile.save()
            return JsonResponse({"message": "success", "profile_pic_url": profile.profile_image.url})
        return JsonResponse({"message": "No file received"}, status=400)

    return JsonResponse({"message": "Invalid request"}, status=400)
    

def check_login(request):
    print(request.user.is_authenticated)
    if request.user.is_authenticated:
        return JsonResponse({"is_authenticated": True, "username": request.user.username, "email": request.user.email, "first_name": request.user.first_name, "last_name": request.user.last_name})
    else:
        return JsonResponse({"is_authenticated": False})
    
@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"isAuthenticated": True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"username": request.user.username})


@require_POST
@login_required
@ensure_csrf_cookie
def update_profile(request):
    data = json.loads(request.body)
    user = request.user

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.profile.phone = data.get("phone", user.profile.phone)  # Assuming profile model exists

    user.save()
    user.profile.save()

    return JsonResponse({"message": "success"})


@ensure_csrf_cookie
@require_POST
def signUp(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get("username")
            password = data.get("password")
            email = data.get("email")
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            phone = data.get("phone")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        # print(username)
        

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        add_user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        if add_user.id == 1:
            add_user.is_staff = True
            add_user.is_superuser = True
            add_user.save()

        # Profile.objects.create(user=add_user, phone=phone)

        login(request, add_user)

        return JsonResponse({"message": "success", "user_id": add_user.id} )
    return JsonResponse({"message": "invalid request"}, status=405)

def contactUs(request):
    data = json.loads(request.body.decode("utf-8"))
    name = data["name"]
    email = data["email"]
    phone = data["phone"]
    message = data["message"]

    send_mail(f"{name} : {phone}", message, email, "avishek.npt@gmail.com")
    return JsonResponse({"message": "email sent successfully"})



def logoutUser(request):
    logout(request)
    return JsonResponse({"message": "success"})
