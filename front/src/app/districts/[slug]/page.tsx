import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchDistrict } from "@/lib/api";
import { MapPin } from "lucide-react";

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
  latitude: number | null;
  longitude: number | null;
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

  const cover = district.photos[0]?.image;
  const mapsUrl =
    district.latitude && district.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${district.latitude},${district.longitude}`
      : null;

  return (
    <main className="min-h-screen">
      {/* Hero avec photo de couverture */}
      <section
        className="relative mt-4 h-72 sm:h-96 flex items-end bg-(--color-mada-vert)"
        style={
          cover
            ? { backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-5xl mx-auto px-6 pb-10 w-full">
          <Link href="/districts" className="text-sm text-white/80 hover:text-white">
            ← Tous les districts
          </Link>
          <p className="uppercase tracking-widest text-sm text-white/80 mt-4 mb-1">
            Région Sofia · District
          </p>
          <h1 className="font-(family-name:--font-heading) text-5xl text-white">
            {district.nom}
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Stats + Localisation */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          <StatCard label="Population" value={district.population?.toLocaleString("fr-FR")} />
          <StatCard label="Superficie" value={district.superficie ? `${district.superficie.toLocaleString("fr-FR")} km²` : undefined} />
          <StatCard label="Code postal" value={district.code_postal} />
          <StatCard label="Communes" value={String(district.nb_commune)} />
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center flex flex-col justify-center">
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-(--color-mada-vert) hover:text-(--color-mada-rouge) transition-colors"
              >
                <MapPin size={16} /> Voir sur G-Maps
              </a>
            ) : (
              <span className="text-sm text-(--color-muted)">Localisation à venir</span>
            )}
            {district.latitude && district.longitude && (
              <p className="text-xs text-(--color-muted) mt-2">
                {district.latitude.toFixed(4)}, {district.longitude.toFixed(4)}
              </p>
            )}
          </div>
        </section>

        {district.description_climat && (
          <section className="mb-16 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-(family-name:--font-heading) text-xl mb-2">Météo locale</h2>
            <p className="text-(--color-muted)">{district.description_climat}</p>
          </section>
        )}

        {district.contenus_ia.length > 0 && (
          <section className="mb-16 space-y-6">
            <h2 className="font-(family-name:--font-heading) text-2xl">À propos du district</h2>
            {district.contenus_ia.map((c, i) => (
              <div key={i}>
                <h3 className="font-semibold capitalize mb-1">{c.type_contenu.replace("_", " ")}</h3>
                <p className="text-(--color-muted)">{c.texte}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mb-16">
          <h2 className="font-(family-name:--font-heading) text-2xl mb-6">
            Communes du district
          </h2>
          {district.communes.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {district.communes.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold">{c.nom}</h3>
                  <p className="text-sm text-(--color-muted)">
                    {c.type_commune === "URBAINE" ? "Urbaine" : "Rurale"} · {c.population.toLocaleString("fr-FR")} hab.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-(--color-muted) text-sm">
              Données des communes en cours de centralisation.
            </p>
          )}
        </section>

        {district.photos.length > 1 && (
          <section>
            <h2 className="font-(family-name:--font-heading) text-2xl mb-6">Galerie</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {district.photos.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.id} src={p.image} alt={p.legende} className="rounded-2xl w-full h-48 object-cover" />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
      <p className="text-2xl font-(family-name:--font-heading) text-(--color-mada-vert)">
        {value || "—"}
      </p>
      <p className="text-xs uppercase tracking-wide text-(--color-muted) mt-1">{label}</p>
    </div>
  );
}