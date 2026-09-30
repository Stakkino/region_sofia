import { fetchDistricts } from "@/lib/api";
import MadagascarLocatorMap from "@/components/MadagascarLocatorMap";
import SofiaDistrictsMap from "@/components/SofiaDistrictsMap";
import DistrictCard from "@/components/DistrictCard";

type Photo = { id: number; image: string; legende: string };
type District = { id: number; nom: string; slug: string; photos: Photo[] };

export default async function Home() {
  const districts: District[] = await fetchDistricts();

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <section className="mb-16 max-w-2xl">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert)] mb-3">
          Région Sofia · Madagascar
        </p>
        <h1 className="font-(family-name:--font-heading)] text-5xl md:text-6xl mb-4">
          L&apos;Intelligence <span className="text-(--color-mada-rouge)] italic">Territoriale</span>
        </h1>
        <p className="text-lg text-(--color-muted)]">
          Explorez la Sofia à travers une immersion numérique inédite au service
          du développement et de la valorisation du territoire.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="text-center">
          <h2 className="font-(family-name:--font-heading)] text-xl mb-4">
            Localisation à Madagascar
          </h2>
          <div className="mx-auto w-full max-w-[320px] aspect-140/263">
            <MadagascarLocatorMap />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-(family-name:--font-heading)] text-xl mb-4">
            Les 7 districts de la Sofia
          </h2>
          <div className="mx-auto w-full max-w-480px aspect-220/260">
            <SofiaDistrictsMap />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-(family-name:--font-heading)] text-2xl mb-6 text-center">
          Explorez le territoire
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <DistrictCard
              key={d.id}
              nom={d.nom}
              slug={d.slug}
              photos={d.photos.map((p) => p.image)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}