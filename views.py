from django.shortcuts import render_to_response
from django.shortcuts import RequestContext
from django.shortcuts import render
from django.contrib.auth import login
from django.http import HttpResponse
from django.contrib.auth.forms import AuthenticationForm
from registration.forms import *
from registration.views import RegistrationView
import json, pdb


def ajax_login(request):
    form = AuthenticationForm()
    if request.method == 'POST':
        form = AuthenticationForm(None, request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return HttpResponse(json.dumps({'success': 'ok'})
                , mimetype='application/json')
    return render(request, 'templates/ajax_login.html', {'form': form})


def ajax_registration(request):
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            return HttpResponse(json.dumps({'success': 'ok', 'mail_activation': True})
                , mimetype='application/json')
    return render(request, 'templates/ajax_registration.html', {'form': form})


def socialauth_success(request):
    return render(request, 'templates/socialauth_success.html', {})

