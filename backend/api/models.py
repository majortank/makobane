# backend/api/models.py
from django.db import models
from django.contrib.auth.models import User

class Word(models.Model):
    word = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Definition(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name='definitions')
    definition = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    votes = models.IntegerField(default=0)