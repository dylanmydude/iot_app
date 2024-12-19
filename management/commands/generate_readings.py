import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from iot_app.models import DeviceSensor, SensorReading

class Command(BaseCommand):
    help = 'Generate random sensor readings for the past month'

    def handle(self, *args, **kwargs):
        # Query all sensors
        sensors = DeviceSensor.objects.all()
        
        if not sensors.exists():
            self.stdout.write(self.style.ERROR('No DeviceSensors found. Please add some sensors first.'))
            return

        # Generate data for the past month
        now = datetime.now()
        readings_per_day = 24  # One reading per hour
        total_days = 30
        total_readings = readings_per_day * total_days

        self.stdout.write(f'Generating {total_readings} readings per sensor for the past month...')

        for sensor in sensors:
            sensor_type = sensor.sensor_type.lower()

            # Define value ranges based on sensor type
            if 'temperature' in sensor_type:
                value_min, value_max = 10.0, 35.0  # Example temperature range (°C)
            elif 'humidity' in sensor_type:
                value_min, value_max = 30.0, 90.0  # Example humidity range (% RH)
            else:
                value_min, value_max = 0.0, 100.0  # Default range

            readings = []
            for hour in range(total_readings):
                timestamp = now - timedelta(hours=hour)
                value = round(random.uniform(value_min, value_max), 2)
                readings.append(SensorReading(sensor=sensor, value=value, timestamp=timestamp))

            # Bulk create readings for the sensor
            SensorReading.objects.bulk_create(readings, batch_size=1000)
            self.stdout.write(self.style.SUCCESS(f'Generated readings for sensor: {sensor.name}'))

        self.stdout.write(self.style.SUCCESS('Sensor readings generation complete.'))
