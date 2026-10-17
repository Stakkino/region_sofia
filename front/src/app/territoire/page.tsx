import { fetchDistricts, fetchCommunes } from "@/lib/api";
import TerritoireExplorer from "@/components/TerritoireExplorer";

type District = { id: number; nom: string; slug: string };
type Commune = {
  id: number;
  nom: string;
  type_commune: "URBAINE" | "RURALE";
  district_nom: string;
  district_slug: string;
  ecoles: unknown[];
  eglises: unknown[];
  usines: unknown[];
  etablissements: unknown[];
  sites_culturels: unknown[];
};

export default async function TerritoirePage() {
  const [districts, communes]: [District[], Commune[]] = await Promise.all([
    fetchDistricts(),
    fetchCommunes(),
  ]);

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <header className="mb-10">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert) mb-3">
          Présentation globale
        </p>
        <h1 className="font-(family-name:--font-heading) text-5xl mb-4">
          Analyse des Blocs Territoriaux
        </h1>
        <p className="text-(--color-muted) max-w-xl">
          Synthèse des infrastructures, commerces et sites culturels par commune.
        </p>
      </header>

      <TerritoireExplorer districts={districts} communes={communes} />
    </main>
  );
}