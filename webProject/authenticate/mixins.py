from django.contrib.auth.mixins import AccessMixin
from django.shortcuts import redirect


class AnonymityRequiredMixin(AccessMixin):
    login_url = 'main_menu'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('main_menu')
        return super().dispatch(request, *args, **kwargs)
