from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt,datetime
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.exceptions import ValidationError
from rest_framework import status
from django.urls import reverse
  

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    

    
    
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("Email not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        refresh_token_payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),  # Refresh token valid for 7 days
            'iat': datetime.datetime.utcnow()
        }
        refresh_token = jwt.encode(refresh_token_payload, 'secret', algorithm='HS256')

        # Save the JWT and timestamp in the user's record
        user.jwt = token
        user.jwt_created_at = datetime.datetime.utcnow()
        user.refresh_token = refresh_token
        user.refresh_token_created_at = datetime.datetime.utcnow()

        user.save()

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)

        response.data = {
            'jwt': token,
            'refresh_token': refresh_token,
            'message': 'Login successful'
        }
        return response

class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            raise AuthenticationFailed("Refresh token not provided or invalid")

        try:
            payload = jwt.decode(refresh_token, "secret", algorithms=['HS256'])

            if not isinstance(payload, dict):
                raise AuthenticationFailed("Invalid token payload")

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Refresh token has expired")
        except jwt.DecodeError:
            raise AuthenticationFailed("Invalid token")
        except Exception as e:
            raise AuthenticationFailed(f"Authentication error: {str(e)}")
        
        user = User.objects.filter(id=payload['id'], refresh_token=refresh_token).first()

        if not user:
            raise AuthenticationFailed("Invalid refresh token")

        # Generate a new access token
        new_access_token_payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        new_access_token = jwt.encode(new_access_token_payload, 'secret', algorithm='HS256')

        # Update user's JWT in the database
        user.jwt = new_access_token
        user.jwt_created_at = datetime.datetime.utcnow()
        user.save()

        response = Response()
        response.set_cookie(key='jwt', value=new_access_token, httponly=True, domain='localhost', path='/')
        response.data = {
            'jwt': new_access_token,
            'message': 'Token refreshed successfully'
        }
        return response

       
class UserView(APIView):
    @csrf_exempt
    def get(self, request):
        token = request.COOKIES.get('jwt') or request.headers.get('Authorization')
        if token and token.startswith('Bearer '):
           token = token.split(' ')[1]
        print("Received Token:", token)  
         
        if not token:
            print("Token not provided in cookies")
            raise AuthenticationFailed("Token not provided or invalid")

        try:
            payload = jwt.decode(token, "secret", algorithms=['HS256'])
            print("Decoded Payload:", payload)
            
            if not isinstance(payload, dict):
                raise AuthenticationFailed("Invalid token payload")
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.DecodeError:
            raise AuthenticationFailed("Invalid token")
        except Exception as e:
            raise AuthenticationFailed(f"Authentication error: {str(e)}")
            
        user = User.objects.filter(id=payload['id']).first()
        
        if not user:
            raise AuthenticationFailed("User not found")

        if user.jwt != token:
            raise AuthenticationFailed("Token does not match the one stored in the database")

        serializer = UserSerializer(user)
        return Response({
            'user': serializer.data,
            'jwt_created_at': user.jwt_created_at  # Include the JWT creation timestamp
        })  

    


class LogoutView(APIView):
    @csrf_exempt
    def post(self, request):
        response = Response({'message': "User Logged Out"})
        response.delete_cookie('jwt')
        response.delete_cookie('refresh_token')
        return response
