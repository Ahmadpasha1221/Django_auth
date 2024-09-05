from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    name=models.CharField(max_length=30)
    email=models.CharField(max_length=40,unique=True)
    password=models.TextField()
    otp_code = models.CharField(max_length=6,null=True,blank=True)
    username = None
    jwt = models.TextField(null=True,blank=True)
    jwt_created_at = models.DateTimeField(null=True, blank=True)  # To track when the JWT was created
    refresh_token = models.TextField(null=True, blank=True)  # New field to store the refresh token
    refresh_token_created_at = models.DateTimeField(null=True, blank=True) 
    
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=[]  
 
    
    def __str__(self):
        return self.user.username