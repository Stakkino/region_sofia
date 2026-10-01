import { fetchDistricts } from "@/lib/api";
import DistrictCard from "@/components/DistrictCard";

type Photo = { id: number; image: string; legende: string };
type District = { id: number; nom: string; slug: string; population: number; photos: Photo[] };

export default async function DistrictsPage() {
  const districts: District[] = await fetchDistricts();

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert) mb-2">
          Région Sofia
        </p>
        <h1 className="font-(family-name:--font-heading) text-5xl mb-3">
          Les Districts
        </h1>
        <p className="text-(--color-muted) max-w-xl mx-auto">
          Sept districts, chacun avec son identité, ses communes et son patrimoine.
        </p>
      </header>

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
    </main>
  );
}