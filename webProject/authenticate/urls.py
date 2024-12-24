from django.urls import path, include
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LogoutView

from .views import LoginView, RegistrationView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('registration/', RegistrationView.as_view(), name='registration'),
    path('logout/', login_required(LogoutView.as_view(next_page='main_menu')), name='logout'),
]