import os
import json
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.utils.dateparse import parse_datetime
from iot_app.models import SensorReading, DeviceSensor
from datetime import timedelta
from django.utils import timezone
from iot_app.services.weather_service import get_weather_by_city
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt  # Disable CSRF for testing; enable in production with proper CSRF tokens
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful', 'token': 'dummy-token'})  # Replace 'dummy-token'
            else:
                return JsonResponse({'error': 'Invalid username or password'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def index(request):
    """Serve the React app."""
    react_index_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist', 'index.html')
    try:
        with open(react_index_path) as f:
            return HttpResponse(f.read(), content_type='text/html')
    except FileNotFoundError:
        return HttpResponse("React build files not found. Did you run 'npm run build'?", status=404)

def reading(request):
    try:
        temperature_sensor = DeviceSensor.objects.filter(sensor_type='temperature').first()
        humidity_sensor = DeviceSensor.objects.filter(sensor_type='humidity').first()

        latest_temperature = SensorReading.objects.filter(sensor=temperature_sensor).latest('timestamp') if temperature_sensor else None
        latest_humidity = SensorReading.objects.filter(sensor=humidity_sensor).latest('timestamp') if humidity_sensor else None

        return JsonResponse({
            'temperature': latest_temperature.value if latest_temperature else None,
            'humidity': latest_humidity.value if latest_humidity else None,
            'timestamp': latest_temperature.timestamp if latest_temperature else None,
            'debug': 'Sensor data fetched successfully'
        })
    except SensorReading.DoesNotExist:
        return JsonResponse({'error': 'No readings found'}, status=404)


def about(request):
    return render(request, 'about.html')

def get_readings_history(request):
    time_range = request.GET.get('time_range', '24hrs')  # Parse time range
    sensors = DeviceSensor.objects.all()
    data = []

    for sensor in sensors:
        readings = SensorReading.objects.filter(sensor=sensor).order_by('-timestamp')[:50]
        data.append({
            "sensor_id": sensor.id,
            "sensor_type": sensor.sensor_type,
            "unit": sensor.unit,
            "readings": [{"value": r.value, "timestamp": r.timestamp} for r in readings]
        })

    return JsonResponse(data, safe=False)

def weather_view(request):
    city = request.GET.get('city', 'Johannesburg') 
    api_key = '65e3beb7f063c593f145cda18df6dfca'
    weather_data = get_weather_by_city(city, api_key)

    if "error" in weather_data:
        return JsonResponse({"error": weather_data["error"]}, status=400)
    else:
        return JsonResponse({
            "city": city,
            "temperature": weather_data["main"]["temp"],
            "description": weather_data["weather"][0]["description"],
            "humidity": weather_data["main"]["humidity"],
            "wind_speed": weather_data["wind"]["speed"],
        })