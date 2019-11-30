from django.db import models

from passlib.hash import pbkdf2_sha256 as passlib

class User(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=256)
    supporter = models.BooleanField()
    supported_person_id = models.IntegerField(blank=True, default=-1)

    def verify_password(self, raw_password):
        return passlib.verify(self.password, raw_password)

class Event(models.Model):
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=256)
    time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Request(models.Model):
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=256)
    handling_user = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)