import Link from "next/link";
import { fetchDistricts } from "@/lib/api";

const PHOTO_DURATION = 4;

type Photo = { id: number; image: string; legende: string };
type District = {
  id: number;
  nom: string;
  slug: string;
  chef_lieu: string;
  code_postal: string;
  population: number | null;
  superficie: number | null;
  nb_commune: number;
  photos: Photo[];
};

export default async function DistrictsPage() {
  const districts: District[] = await fetchDistricts();

  const totalPopulation = districts.reduce((sum, d) => sum + (d.population || 0), 0);
  const totalSuperficie = districts.reduce((sum, d) => sum + (d.superficie || 0), 0);


  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert) mb-3">
          Région Sofia · Madagascar
        </p>
        <h1 className="font-(family-name:--font-heading) text-5xl mb-4">
          Les Districts
        </h1>
        <p className="text-(--color-muted) max-w-xl mx-auto">
          Sept territoires, chacun avec son histoire, son climat et ses communes.
        </p>

        <div className="flex justify-center gap-10">
          <div>
            <p className="text-3xl font-(family-name:--font-heading) text-(--color-mada-vert)">
              {totalPopulation.toLocaleString("fr-FR")}
            </p>
            <p className="text-xs uppercase tracking-wide text-(--color-muted)">Habitants</p>
          </div>
          <div>
            <p className="text-3xl font-(family-name:--font-heading) text-(--color-mada-vert)">
              {totalSuperficie.toLocaleString("fr-FR")} km²
            </p>
            <p className="text-xs uppercase tracking-wide text-(--color-muted)">Superficie totale</p>
          </div>
        </div>

      </header>



      <div className="space-y-5">
        {districts.map((d) => {
          const duration = PHOTO_DURATION * Math.max(d.photos.length, 1);
          return (
            <Link
              key={d.id}
              href={`/districts/${d.slug}`}
              className="group flex flex-col sm:flex-row gap-5 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 rounded-xl overflow-hidden bg-(--color-mada-vert)">
                {d.photos.length > 0 ? (
                  d.photos.map((p, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={p.id}
                      src={p.image}
                      alt={d.nom}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={
                        d.photos.length > 1
                          ? {
                              animation: `district-fade ${duration}s infinite`,
                              animationDelay: `${-(i * PHOTO_DURATION)}s`,
                            }
                          : undefined
                      }
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-(family-name:--font-heading) text-4xl text-white/70">
                      {d.nom.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h2 className="font-(family-name:--font-heading) text-2xl group-hover:text-(--color-mada-rouge) transition-colors">
                  {d.nom}
                </h2>
                {d.chef_lieu && (
                  <p className="text-sm text-(--color-muted) mb-3">
                    Chef-lieu : {d.chef_lieu}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  <Chip label={d.population ? `${d.population.toLocaleString("fr-FR")} hab.` : "Population —"} />
                  <Chip label={d.superficie ? `${d.superficie.toLocaleString("fr-FR")} km²` : "Superficie —"} />
                  <Chip label={d.code_postal ? `CP ${d.code_postal}` : "CP —"} />
                  <Chip label={`${d.nb_commune} commune${d.nb_commune > 1 ? "s" : ""}`} />
                </div>
              </div>

              <div className="hidden sm:flex items-center">
                <span className="text-(--color-mada-vert) group-hover:translate-x-1 transition-transform text-xl">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs font-medium px-3 py-1 rounded-full bg-(--color-fond) text-(--color-texte)/70 border border-black/5">
      {label}
    </span>
  );
}