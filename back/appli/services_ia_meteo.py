import requests
from .models import District

def maj_meteo_districts():
    districts = District.objects.exclude(latitude__isnull=True)
    for d in districts:
        r = requests.get("https://api.open-meteo.com/v1/forecast", params={
            "latitude": d.latitude,
            "longitude": d.longitude,
            "current": "temperature_2m,weather_code",
        }, timeout=10)
        if r.status_code != 200:
            continue
        current = r.json().get("current", {})
        d.meteo_info = current
        d.description_climat = f"{current.get('temperature_2m')}°C"
        d.save()
    return "Météo des districts mise à jour."