"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

type District = { id: number; nom: string; slug: string };
type Commune = {
  id: number;
  nom: string;
  type_commune: "URBAINE" | "RURALE";
  population: number;
  district_nom: string;
  district_slug: string;
};

export default function CommunesExplorer({
  districts,
  communes,
}: {
  districts: District[];
  communes: Commune[];
}) {
  const [districtFilter, setDistrictFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return communes.filter((c) => {
      const matchDistrict = !districtFilter || c.district_slug === districtFilter;
      const matchSearch = c.nom.toLowerCase().includes(search.toLowerCase());
      return matchDistrict && matchSearch;
    });
  }, [communes, districtFilter, search]);

  const countFor = (slug: string | null) =>
    slug ? communes.filter((c) => c.district_slug === slug).length : communes.length;

  return (
    <div>
      <section className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-(family-name:--font-heading) text-(--color-mada-vert)">
            {communes.length}
          </p>
          <p className="text-xs uppercase tracking-wide text-(--color-muted) mt-1">
            Total communes enregistrées
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
          <p className="text-3xl font-(family-name:--font-heading) text-(--color-mada-vert)">
            {districts.filter((d) => countFor(d.slug) > 0).length} / {districts.length}
          </p>
          <p className="text-xs uppercase tracking-wide text-(--color-muted) mt-1">
            Districts actifs (avec communes)
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2 mb-5">
        <FilterChip
          label={`Tous (${communes.length})`}
          active={districtFilter === null}
          onClick={() => setDistrictFilter(null)}
        />
        {districts.map((d) => (
          <FilterChip
            key={d.slug}
            label={`${d.nom} (${countFor(d.slug)})`}
            active={districtFilter === d.slug}
            onClick={() => setDistrictFilter(d.slug)}
          />
        ))}
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-muted)" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une commune par nom, type..."
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-(--color-mada-vert)/30"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 px-5 py-3 text-xs uppercase tracking-wide text-(--color-muted) border-b border-black/5">
          <span>Nom</span>
          <span>Type</span>
          <span>District rattaché</span>
          <span className="text-right">Population</span>
        </div>
        {filtered.length === 0 ? (
          <p className="px-5 py-8 text-center text-(--color-muted) text-sm">
            Aucune commune ne correspond à la recherche.
          </p>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 px-5 py-4 border-b border-black/5 last:border-0 items-center"
            >
              <span className="font-medium">{c.nom}</span>
              <span>
                <span className="text-[10px] font-semibold uppercase px-2 py-1 rounded-full bg-(--color-fond) text-(--color-mada-vert)">
                  {c.type_commune === "URBAINE" ? "Urbaine" : "Rurale"}
                </span>
              </span>
              <span className="text-(--color-muted) text-sm">{c.district_nom}</span>
              <span className="text-right text-sm">{c.population.toLocaleString("fr-FR")} hab.</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-4 py-2 rounded-full transition-colors ${
        active
          ? "bg-(--color-mada-vert) text-white"
          : "bg-white text-(--color-texte)/70 hover:bg-(--color-mada-vert)/10"
      }`}
    >
      {label}
    </button>
  );
}