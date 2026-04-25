import google.generativeai as genai
import json
from .models import District, ContenuDynamiqueIA, SiteCulturel

# Configure ton API Key ici
genai.configure(api_key="TA_CLE_API_ICI")
model = genai.GenerativeModel('gemini-pro')


def generer_contenu_district(district_name):
    """
    Demande à l'IA de générer des infos sur un district et les enregistre.
    """
    prompt = f"""
    Tu es un expert en géographie et culture malgache. 
    Donne-moi des informations détaillées sur le district de {district_name} dans la région SOFIA.
    Réponds UNIQUEMENT sous format JSON avec les clés suivantes :
    - "histoire": "texte long"
    - "fady": "liste des tabous locaux"
    - "analyse_sociale": "climat social et activités principales"
    - "specialites": "produits locaux ou gastronomie"
    """

    response = model.generate_content(prompt)
    
    try:
        # Nettoyage de la réponse pour s'assurer que c'est du JSON pur
        data = json.loads(response.text)
        
        district = District.objects.get(nom=district_name)
        
        # On enregistre ou met à jour les contenus
        for type_c, texte in data.items():
            ContenuDynamiqueIA.objects.update_or_create(
                district=district,
                type_contenu=type_c,
                defaults={'texte': texte}
            )
        return f"Mise à jour réussie pour {district_name}"
    except Exception as e:
        return f"Erreur : {e}"


def generer_details_site(site_id):
    """
    Complète les détails d'un SiteCulturel (ex: Magala) via l'IA.
    """
    site = SiteCulturel.objects.get(id=site_id)
    
    prompt = f"""
    Donne des informations précises sur le lieu nommé '{site.nom}' situé à {site.commune.nom}, Madagascar.
    Précise son histoire, son lien avec {site.proprietaire} si applicable, 
    les types de produits qu'on y trouve (fruits, etc.) et son rôle social ou religieux.
    Sois très précis pour attirer des visiteurs.
    """

    response = model.generate_content(prompt)
    site.description_ia = response.text
    site.save()
    return f"Détails générés pour {site.nom}"