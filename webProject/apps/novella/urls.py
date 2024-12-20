from django.urls import path, include
from .views import NovellaView

urlpatterns = [
    path('', NovellaView.as_view(), name='novella_page')
]