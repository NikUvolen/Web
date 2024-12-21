from django.db import models
from django.contrib.auth.models import User
from random import shuffle

class UserScore(models.Model):
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
    quiz_is_past = models.BooleanField(default=False, verbose_name='quiz_is_past')
    number_of_correct_answers = models.IntegerField(default=0, verbose_name='correct_answers')

class Question(models.Model):
    id_question = models.AutoField(primary_key=True)
    question = models.CharField(max_length=512, verbose_name='Question')
    number_of_passes = models.IntegerField(default=0, verbose_name='Numbder of passes')
    number_of_correct_answers = models.IntegerField(default=0, verbose_name='Number of correct answers')

    def __str__(self):
        return self.question
    
    def get_answers(self):
        answers_list = list(Answer.objects.filter(question=self))
        data = []
        shuffle(answers_list)

        for answer in answers_list:
            data.append({
                'answer': answer.answer,
            })
        return data
    
    def get_correct_answer(self):
        return Answer.objects.get(question=self, is_correct=True)


    
class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='question_answer', on_delete=models.CASCADE)
    answer = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.answer