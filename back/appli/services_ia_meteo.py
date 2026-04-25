import google.generativeai as genai
import json
from .models import Region, District

genai.configure(api_key="TA_CLE_API_ICI")
model = genai.GenerativeModel('gemini-pro')


# ------- REGION --------
def maj_meteo_region():
    """Mise à jour météo globale SOFIA (toutes les 24h)"""
    region = Region.objects.get(nom="SOFIA")
    prompt = "Donne la météo actuelle pour la région SOFIA, Madagascar en une phrase courte et attirante."
    
    response = model.generate_content(prompt)
    region.meteo_actuelle = response.text
    region.save()
    return "Météo Région mise à jour."


# ------ DISTRICT ------
def maj_meteo_districts():
    """Mise à jour météo par district (toutes les 6h)"""
    districts = District.objects.all()
    for d in districts:
        prompt = f"""
        Donne la météo actuelle pour le district de {d.nom}, Madagascar.
        Réponds UNIQUEMENT en JSON avec :
        - "temp": "valeur en °C",
        - "etat": "Ensoleillé/Pluie/Nuageux",
        - "humidite": "%",
        - "description": "une courte phrase de conseil (ex: idéal pour la vanille)"
        """
        response = model.generate_content(prompt)
        try:
            data = json.loads(response.text)
            d.meteo_info = data # Enregistré dans le JSONField
            d.description_climat = data.get('description', '')
            d.save()
        except:
            continue
    return "Météo des districts mise à jour."