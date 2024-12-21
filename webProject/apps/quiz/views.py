from random import sample
from json import loads
from django import views
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Question, Answer, UserScore

from webProject.mixins import AuthorizationRequiredMixin


class QuizView(AuthorizationRequiredMixin, views.View):
    def get(self, request, *args, **kwargs):
        user_score = UserScore.objects.filter(user=request.user).first()
        if user_score is not None and user_score.quiz_is_past:
            return redirect('quiz results')
        max_question_id = Question.objects.latest('id_question').id_question
        questions_id_list = sample(range(2, max_question_id + 1), 5)
        question_list = list(Question.objects.filter(id_question__in=questions_id_list))

        data = []

        for idx, question in enumerate(question_list):
            data.append({
                'current_idx': question.id_question,
                'idx': idx + 1,
                'question': question.question,
                'answers': question.get_answers()
            })

        return render(request, 'quiz/quiz.html', context={ 'questions': data })
    
    def post(self, request, *args, **kwargs):
        user_score = UserScore.objects.filter(user=request.user).first()
        if user_score is None:
            user_score = UserScore.objects.create(user=request.user)

        current_answers = loads(request.body)
        current_answers = current_answers.get('Results')
        questions_id = [int(idx) for idx in list(current_answers)]
        current_answers = list(current_answers.values())
        questions = Question.objects.filter(id_question__in=questions_id)

        current_ansers_count = 0

        for idx, question in enumerate(questions):
            question.number_of_passes += 1
            if question.get_correct_answer().answer == current_answers[idx]:
                question.number_of_correct_answers += 1
                current_ansers_count += 1
            question.save()

        user_score.quiz_is_past = True
        user_score.number_of_correct_answers = current_ansers_count
        user_score.save()

        return JsonResponse({'redirect_url': '/'})
    
class ResultsView(AuthorizationRequiredMixin, views.View):
    def get(self, request, *args, **kwargs):
        users_score = UserScore.objects.all()
        user_score = users_score.filter(user=request.user).first()
        questions = Question.objects.all()
        if (user_score is None) or (not user_score.quiz_is_past):
            return redirect('quiz')
        
        number_of_passes_list = []
        number_of_correct_answers_list = []
        for question in questions:
            number_of_passes_list.append(question.number_of_passes)
            number_of_correct_answers_list.append(question.number_of_correct_answers)

        context = {
            'results': [0, 0, 0, 0, 0, 0],
            'number_of_passes_list': number_of_passes_list,
            'number_of_correct_answers_list': number_of_correct_answers_list,
        }
        for user in users_score:
            context['results'][user.number_of_correct_answers] += 1
        context['results'].reverse()
        context['results'] = str(context['results'])

        return render(request, 'quiz/results.html', context=context)
