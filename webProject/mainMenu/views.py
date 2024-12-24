from django import views
from django.shortcuts import render

from quiz.views import UserScore

class MainMenuViewPage(views.View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            context = {
                'is_quiz_complete': False,
                'user_score': ''
            }
            user_score = UserScore.objects.filter(user=request.user).first()
            if user_score is not None and user_score.quiz_is_past:
                context['is_quiz_complete'] = True
                context['user_score'] = user_score
            return render(request, 'mainMenu/main_menu.html', context=context)
        return render(request, 'mainMenu/main_menu.html')
