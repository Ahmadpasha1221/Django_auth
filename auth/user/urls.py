from django.urls import path
from .views import RegisterView,LoginView,UserView,LogoutView,RefreshTokenView,BrandView,SportsView,SuvView,CarModelView
urlpatterns = [
    path("register",RegisterView.as_view()),
    path("login",LoginView.as_view()),
    path("user",UserView.as_view()),
    path("logout",LogoutView.as_view()),
    path("refresh-token", RefreshTokenView.as_view()),
    path("brand", BrandView.as_view()),
    path("sports", SportsView.as_view()),
    path("suvs", SuvView.as_view()),
    path('Model/<int:brand_id>', CarModelView.as_view())
]