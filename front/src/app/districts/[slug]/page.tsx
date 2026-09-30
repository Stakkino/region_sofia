import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchDistrict } from "@/lib/api";

type Commune = { id: number; nom: string; type_commune: string; population: number };
type ContenuIA = { type_contenu: string; texte: string };
type Photo = { id: number; image: string; legende: string };

type DistrictDetail = {
  id: number;
  nom: string;
  chef_lieu: string;
  code_postal: string;
  population: number;
  superficie: number;
  distance_vers_antsohihy: number;
  description_climat: string;
  nb_commune: number;
  communes: Commune[];
  contenus_ia: ContenuIA[];
  photos: Photo[];
};

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let district: DistrictDetail;

  try {
    district = await fetchDistrict(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <Link href="/districts" className="text-sm text-(--color-mada-vert)] hover:underline">
        ← Tous les districts
      </Link>

      <header className="mt-4 mb-12">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert)] mb-2">
          District · Région Sofia
        </p>
        <h1 className="font-(family-name:--font-heading)] text-5xl mb-2">
          {district.nom}
        </h1>
        {district.chef_lieu && (
          <p className="text-(--color-muted)]">Chef-lieu : {district.chef_lieu}</p>
        )}
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <StatCard label="Population" value={district.population?.toLocaleString("fr-FR")} />
        <StatCard label="Superficie" value={district.superficie ? `${district.superficie.toLocaleString("fr-FR")} km²` : undefined} />
        <StatCard label="Code postal" value={district.code_postal} />
        <StatCard label="Communes" value={String(district.nb_commune)} />
      </section>

      {district.description_climat && (
        <section className="mb-16 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-(family-name:--font-heading)] text-xl mb-2">Météo locale</h2>
          <p className="text-(--color-muted)]">{district.description_climat}</p>
        </section>
      )}

      {district.contenus_ia.length > 0 && (
        <section className="mb-16 space-y-6">
          <h2 className="font-(family-name:--font-heading)] text-2xl">À propos du district</h2>
          {district.contenus_ia.map((c, i) => (
            <div key={i}>
              <h3 className="font-semibold capitalize mb-1">{c.type_contenu.replace("_", " ")}</h3>
              <p className="text-(--color-muted)]">{c.texte}</p>
            </div>
          ))}
        </section>
      )}

      <section className="mb-16">
        <h2 className="font-(family-name:--font-heading)] text-2xl mb-6">
          Communes du district
        </h2>
        {district.communes.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {district.communes.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold">{c.nom}</h3>
                <p className="text-sm text-(--color-muted)]">
                  {c.type_commune === "URBAINE" ? "Urbaine" : "Rurale"} · {c.population.toLocaleString("fr-FR")} hab.
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-(--color-muted)] text-sm">
            Données des communes en cours de centralisation.
          </p>
        )}
      </section>

      {district.photos.length > 0 && (
        <section>
          <h2 className="font-(family-name:--font-heading)] text-2xl mb-6">Galerie</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {district.photos.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.id} src={p.image} alt={p.legende} className="rounded-2xl w-full h-48 object-cover" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function StatCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
      <p className="text-2xl font-(family-name:--font-heading)] text-(--color-mada-vert)]">
        {value || "—"}
      </p>
      <p className="text-xs uppercase tracking-wide text-(--color-muted)] mt-1">{label}</p>
    </div>
  );
}