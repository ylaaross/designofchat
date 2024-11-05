from django.contrib import admin
from django.urls import path,include
from app import views
from django.shortcuts import render, get_object_or_404


urlpatterns = [
    path('api/friends/<int:user_id>/', views.friends_list, name='friends_list'),
    path('api/users/', views.index),
    path('api/friendship/add/', views.add_friendship, name='add_friendship')
]
