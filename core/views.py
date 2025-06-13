from django.shortcuts import render
from django.conf import settings
import requests
import logging

logger = logging.getLogger(__name__)

def weather_api():
    API_KEY = settings.WEATHER_API_KEY
    if not API_KEY:
        logger.error("WEATHER_API_KEY is not configured in settings.")
        return None
    
    weatherData = {}
    base_url = "http://api.weatherapi.com/v1"
    endpoints = ["current.json", "ip.json"]
    params = {
        "key" : API_KEY,
        "q" : "auto:ip",
        "aqi" : "yes"
    }

    for i in range(len(endpoints)):
        try:
            response = requests.get(f"{base_url}/{endpoints[i]}", params=params, timeout=30)
            response.raise_for_status()
            data = response.json()
            weatherData[i] = data

        except requests.exceptions.HTTPError as http_err:
            logger.error(f"HTTP error occurred while calling Weather API: {http_err} - Response: {response.text}")
        except requests.exceptions.ConnectionError as conn_err:
            logger.error(f"Connection error occurred while calling Weather API: {conn_err}")
        except requests.exceptions.Timeout as timeout_err:
            logger.error(f"Timeout error occurred while calling Weather API: {timeout_err}")
        except requests.exceptions.RequestException as req_err:
            logger.error(f"An error occurred while calling Weather API: {req_err}")
        except ValueError:
            logger.error(f"Error decoding JSON response from Weather API. Response: {response.text}")
    
    return weatherData if weatherData else None

# Create your views here.
def index_page_view(request):
    weatherData = weather_api()
    return render(request, 'index.html', {'weatherInfo' : weatherData})