from rest_framework import serializers
from .models import User
from .models import Brand,CarModel
from .models import Sports
from .models import Suv


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)  # This method hashes the password
            print(instance.password)
        instance.save()
        return instance


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id","brandName","brandDescription","brandUrl"]
        
        
        
class SportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sports   
        fields = ["id","familyCarBrand","familyCarDescription","familyCarUrl"]     
        
        
class SuvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suv
        fields = ["id","suvCarBrand","suvCarDescription","suvCarUrl"]
        

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel  
        fields = ['id','modelName', 'modelDescription', 'price']        