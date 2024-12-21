from django.urls import path
from .views import QuizView, ResultsView

urlpatterns = [
    path('', QuizView.as_view(), name='quiz'),
    path('results/', ResultsView.as_view(), name='quiz results')
]