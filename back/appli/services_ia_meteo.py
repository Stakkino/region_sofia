import requests
from .models import District

def maj_meteo_districts():
    """Met à jour la météo de chaque district via Open-Meteo (gratuit, sans clé API)."""
    districts = District.objects.exclude(latitude__isnull=True).exclude(longitude__isnull=True)
    maj = 0
    for d in districts:
        try:
            r = requests.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": d.latitude,
                    "longitude": d.longitude,
                    "current": "temperature_2m,weather_code,relative_humidity_2m",
                },
                timeout=10,
            )
            r.raise_for_status()
        except requests.RequestException:
            continue

        current = r.json().get("current", {})
        if not current:
            continue

        d.meteo_info = current
        d.description_climat = f"{current.get('temperature_2m')}°C, humidité {current.get('relative_humidity_2m')}%"
        d.save()
        maj += 1

    return f"Météo mise à jour pour {maj} district(s)."