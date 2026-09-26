import { fetchDistricts } from "@/lib/api";
import MadagascarLocatorMap from "@/components/MadagascarLocatorMap";
import SofiaDistrictsMap from "@/components/SofiaDistrictsMap";

type District = {
  id: number;
  nom: string;
  slug: string;
};

export default async function Home() {
  const districts: District[] = await fetchDistricts();

  return (
    <main className="min-h-screen px-6 py-16 max-w-6xl mx-auto">
      <section className="mb-16 max-w-2xl">
        <p className="uppercase tracking-widest text-sm text-[var(--color-ocre)] mb-3">
          Région Sofia · Madagascar
        </p>
        <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl mb-4">
          L&apos;Intelligence{" "}
          <span className="text-[var(--color-terracotta)] italic">
            Territoriale
          </span>
        </h1>
        <p className="text-lg text-[var(--color-texte)]/80">
          Explorez la Sofia à travers une immersion numérique inédite au service
          du développement et de la valorisation du territoire.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-20">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-3">
            Localisation à Madagascar
          </h2>
          <div className="h-72 bg-white/40 rounded-lg">
            <MadagascarLocatorMap />
          </div>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl mb-3">
            Les 7 districts de la Sofia
          </h2>
          <div className="h-72 bg-white/40 rounded-lg">
            <SofiaDistrictsMap />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-heading)] text-2xl mb-6">
          Explorez le territoire
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => {
            return (
              <a 
                key={d.id}
                href={"/districts/" + d.slug}
                className="border border-[var(--color-vert)]/30 rounded-lg p-5 bg-white/50 hover:border-[var(--color-terracotta)] transition-colors"
              >
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-vert)]">
                  {d.nom}
                </h3>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}