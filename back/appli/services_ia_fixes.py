import os
import json
import re
from google import genai
from .models import District, ContenuDynamiqueIA, SiteCulturel

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
MODEL = "gemini-2.5-flash"


def _extraire_json(texte):
    """Nettoie la réponse Gemini (retire les balises ```json``` si présentes) et parse le JSON."""
    texte = texte.strip()
    texte = re.sub(r"^```json|^```|```$", "", texte, flags=re.MULTILINE).strip()
    return json.loads(texte)


def generer_contenu_district(district_name):
    """Demande à l'IA de générer des infos sur un district et les enregistre."""
    prompt = f"""Tu es un expert en géographie et culture malgache.
Donne-moi des informations détaillées sur le district de {district_name} dans la région SOFIA.
Réponds UNIQUEMENT sous format JSON avec les clés suivantes :
- "histoire": "texte long"
- "fady": "liste des tabous locaux"
- "analyse_sociale": "climat social et activités principales"
- "specialites": "produits locaux ou gastronomie"
"""
    try:
        response = client.models.generate_content(model=MODEL, contents=prompt)
        data = _extraire_json(response.text)
        district = District.objects.get(nom=district_name)

        for type_c, texte in data.items():
            ContenuDynamiqueIA.objects.update_or_create(
                district=district,
                type_contenu=type_c,
                defaults={"texte": texte},
            )
        return f"Mise à jour réussie pour {district_name}"

    except District.DoesNotExist:
        return f"Erreur : district '{district_name}' introuvable"
    except json.JSONDecodeError:
        return "Erreur : réponse IA non conforme au format JSON"
    except Exception as e:
        return f"Erreur : {e}"


def generer_details_site(site_id):
    """Complète les détails d'un SiteCulturel (ex: Magala) via l'IA."""
    try:
        site = SiteCulturel.objects.get(id=site_id)
    except SiteCulturel.DoesNotExist:
        return f"Erreur : site {site_id} introuvable"

    prompt = f"""Donne des informations précises sur le lieu nommé '{site.nom}' situé à {site.commune.nom}, Madagascar.
Précise son histoire, son lien avec {site.proprietaire} si applicable, les types de produits qu'on y trouve (fruits, etc.) et son rôle social ou religieux.
Sois très précis pour attirer des visiteurs.
"""
    try:
        response = client.models.generate_content(model=MODEL, contents=prompt)
        site.description_ia = response.text
        site.save()
        return f"Détails générés pour {site.nom}"
    except Exception as e:
        return f"Erreur : {e}"