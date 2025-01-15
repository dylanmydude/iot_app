from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


# Core Models
class Account(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class User(AbstractUser):
    account = models.ForeignKey(
        'Account',
        on_delete=models.CASCADE,
        null=True,  # Allow null values
        blank=True  # Allow blank values in forms
    )
    role = models.CharField(max_length=50, choices=[
        ('admin', 'Admin'),
        ('user', 'User'),
        ('superuser', 'Superuser')
    ])
    groups = models.ManyToManyField(
        Group,
        related_name='iot_app_user_groups',  # Avoid conflict
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='iot_app_user_permissions',  # Avoid conflict
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
# Timeline and Plant Models
class Timeline(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, null=True, blank=True)
    weather_provider = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TimelineEvent(models.Model):
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    event_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TimelinePlant(models.Model):
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    plant = models.ForeignKey('Plant', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Plant(models.Model):
    name = models.CharField(max_length=255)
    optimal_temperature_min = models.FloatField(null=True, blank=True)
    optimal_temperature_max = models.FloatField(null=True, blank=True)
    optimal_humidity_min = models.FloatField(null=True, blank=True)
    optimal_humidity_max = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# Device and Sensors
class Device(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[
        ('sensor', 'Sensor'),
        ('camera', 'Camera'),
        ('hub', 'Hub')
    ])
    metadata = models.JSONField(null=True, blank=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class DeviceSensor(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    sensor_type = models.CharField(max_length=50)
    unit = models.CharField(max_length=50, null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class SensorReading(models.Model):
    sensor = models.ForeignKey(DeviceSensor, on_delete=models.CASCADE)
    value = models.FloatField()
    timestamp = models.DateTimeField()

class DeviceHealth(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=[
        ('online', 'Online'),
        ('offline', 'Offline'),
        ('low_battery', 'Low Battery')
    ])
    last_reported = models.DateTimeField()
    metadata = models.JSONField(null=True, blank=True)

# Notifications and Actions
class NotificationRule(models.Model):
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    sensor = models.ForeignKey(DeviceSensor, on_delete=models.CASCADE)
    condition = models.CharField(max_length=50)  # e.g., '>', '<', '='
    threshold = models.FloatField()
    action = models.CharField(max_length=50, choices=[
        ('notify', 'Notify'),
        ('trigger_action', 'Trigger Action')
    ])
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Action(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=255)
    parameters = models.JSONField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=[
        ('success', 'Success'),
        ('failed', 'Failed')
    ])
    created_at = models.DateTimeField(auto_now_add=True)

# Vision AI
class VisionCamera(models.Model):
    name = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    location = models.CharField(max_length=255, null=True, blank=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=True, blank=True)
    metadata = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
