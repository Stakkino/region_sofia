import { fetchDistricts, fetchCommunes } from "@/lib/api";
import CommunesExplorer from "@/components/CommunesExplorer";

type District = { id: number; nom: string; slug: string };
type Commune = {
  id: number;
  nom: string;
  type_commune: "URBAINE" | "RURALE";
  population: number;
  district_nom: string;
  district_slug: string;
};

export default async function CommunesPage() {
  const [districts, communes]: [District[], Commune[]] = await Promise.all([
    fetchDistricts(),
    fetchCommunes(),
  ]);

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert) mb-3">
          Madagasikara · Région Sofia
        </p>
        <h1 className="font-(family-name:--font-heading) text-5xl mb-4">Les Communes</h1>
        <p className="text-(--color-muted) max-w-xl mx-auto">
          Gestion globale et répartition territoriale des municipalités.
        </p>
      </header>

      <CommunesExplorer districts={districts} communes={communes} />
    </main>
  );
}