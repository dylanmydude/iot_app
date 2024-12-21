import requests

OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather_by_city(city, api_key):
    """
    Fetch weather data for a given city.
    :param city: City name
    :param api_key: OpenWeatherMap API key
    :return: JSON response containing weather data
    """
    params = {
        'q': city,
        'appid': api_key,
        'units': 'metric'
    }
    response = requests.get(OPENWEATHER_API_URL, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.json()}
