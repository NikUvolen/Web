from django.contrib import admin
from .models import Question, Answer, UserScore

class AnswersInLine(admin.TabularInline):
    model = Answer
    fields = ('answer', 'is_correct')
    max_num = 7
    extra = 7
    can_delete = True
    show_change_link = True

class UserScoreAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz_is_past', 'number_of_correct_answers')

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id_question', 'question', 'number_of_passes', 'number_of_correct_answers')
    list_display_links = ('id_question', 'question')
    search_fields = ('id_question', 'question')
    fields = ('question', 'number_of_passes', 'number_of_correct_answers')
    # readonly_fields = ('number_of_passes', 'number_of_correct_answers')
    inlines = [AnswersInLine]

class AnserAdmin(admin.ModelAdmin):
    list_display = ('answer', 'is_correct', 'question')

admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnserAdmin)
admin.site.register(UserScore, UserScoreAdmin)
