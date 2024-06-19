import os
import django
import serial
import time

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "iot.settings")
django.setup()

from iot_app.models import SensorReading

def read_from_serial():
    try:
        ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
        print("Connected to Arduino on /dev/ttyUSB0")
    except Exception as e:
        print(f"Failed to connect to Arduino: {e}")
        raise

    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            print(f"Received: {line}")
            
            try:
                # Assuming the line is in the format "temperature,humidity"
                temperature, humidity = map(float, line.split(','))
                SensorReading.objects.create(
                    temperature=temperature,
                    humidity=humidity
                )
                print(f"Saved to DB: Temperature={temperature}, Humidity={humidity}")
            except ValueError:
                print(f"Invalid data format: {line}")

        time.sleep(1)

if __name__ == "__main__":
    read_from_serial()
