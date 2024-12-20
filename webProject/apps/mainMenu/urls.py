from django.urls import path, include
from .views import MainMenuViewPage

urlpatterns = [
    path('', MainMenuViewPage.as_view(), name='main_menu')
]