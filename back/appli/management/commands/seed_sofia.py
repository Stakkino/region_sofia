from django.core.management.base import BaseCommand
from appli.models import Region, District

DISTRICTS = ["Antsohihy", "Port-Bergé (Boriziny)", "Mandritsara", "Mampikony",
             "Befandriana Avaratra", "Bealanana", "Analalava"]

class Command(BaseCommand):
    help = "Crée la région SOFIA et ses 7 districts"

    def handle(self, *args, **options):
        region, _ = Region.objects.get_or_create(
            nom="SOFIA", defaults={"chef_lieu": "Antsohihy"}
        )
        for nom in DISTRICTS:
            District.objects.get_or_create(region=region, nom=nom)
        self.stdout.write(self.style.SUCCESS("Région et districts créés."))