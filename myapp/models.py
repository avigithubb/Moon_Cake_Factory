from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


STATUS_CHOICES = [('Pending', 'Pending'),
    ('Processing', 'Processing'),
    ('Shipped', 'Shipped'),
    ('Delivered', 'Delivered'),
    ('Cancelled', 'Cancelled'),]

User = get_user_model()

# class User(models.Model):
#     id = models.AutoField(primary_key=True) 
#     first_name = models.CharField(max_length=255, null=False)
#     last_name = models.CharField(max_length=255, null=False, default="Last Name")
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255) 
#     username = models.CharField(max_length=255, default="User")
#     is_admin = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.first_name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='profile_pics/', default='profile_pics/profile.png')
    phone = models.CharField(max_length=15, unique=True, default="1234567891", null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    rating = models.DecimalField(max_digits=5, decimal_places=1, null=True)
    review = models.JSONField(default=list, blank=True)
    category = models.CharField(max_length=255, null=True)
    main_image = models.ImageField(upload_to='product_images/', blank=True, null=True)  # Main image
    sub_image1 = models.ImageField(upload_to='product_images/', blank=True, null=True)  # Sub images
    sub_image2 = models.ImageField(upload_to='product_images/', blank=True, null=True)
    sub_image3 = models.ImageField(upload_to='product_images/', blank=True, null=True)
    sub_image4 = models.ImageField(upload_to='product_images/', blank=True, null=True)
    key_features = models.JSONField(default=list, blank=True)  # To store a list/array of features
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    id =  models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True) #Null to be Deleted
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    payment_id = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
    
    

class OrderItem(models.Model):
    id =models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.order.id} - {self.product.name}"

class SearchHistory(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    search_term = models.CharField(max_length=200)
    timestamp = models.DateTimeField

    def __str__(self):
        return f"{self.user.username} searched '{self.query}'"
