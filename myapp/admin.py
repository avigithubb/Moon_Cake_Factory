from django.contrib import admin
from .models import Product, Order, OrderItem, SearchHistory, CartItem, Profile

# Register your models here.

admin.site.register(Profile)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(SearchHistory)
admin.site.register(CartItem)
