"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, School, ShoppingBag, Landmark } from "lucide-react";

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

type Bloc = "tous" | "infrastructures" | "commerces" | "patrimoine";

export default function TerritoireExplorer({
  districts,
  communes,
}: {
  districts: District[];
  communes: Commune[];
}) {
  const [districtFilter, setDistrictFilter] = useState<string | null>(null);
  const [blocFilter, setBlocFilter] = useState<Bloc>("tous");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return communes.filter((c) => {
      const matchDistrict = !districtFilter || c.district_slug === districtFilter;
      const matchSearch = c.nom.toLowerCase().includes(search.toLowerCase());
      const infraCount = c.ecoles.length + c.eglises.length + c.usines.length;
      const matchBloc =
        blocFilter === "tous" ||
        (blocFilter === "infrastructures" && infraCount > 0) ||
        (blocFilter === "commerces" && c.etablissements.length > 0) ||
        (blocFilter === "patrimoine" && c.sites_culturels.length > 0);
      return matchDistrict && matchSearch && matchBloc;
    });
  }, [communes, districtFilter, blocFilter, search]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-muted)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une commune..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-(--color-mada-vert)/30"
          />
        </div>
        <select
          value={districtFilter ?? ""}
          onChange={(e) => setDistrictFilter(e.target.value || null)}
          className="px-4 py-3 rounded-full bg-white shadow-sm text-sm focus:outline-none"
        >
          <option value="">Tous les Districts</option>
          {districts.map((d) => (
            <option key={d.slug} value={d.slug}>{d.nom}</option>
          ))}
        </select>
        <select
          value={blocFilter}
          onChange={(e) => setBlocFilter(e.target.value as Bloc)}
          className="px-4 py-3 rounded-full bg-white shadow-sm text-sm focus:outline-none"
        >
          <option value="tous">Tous les Blocs</option>
          <option value="infrastructures">Écoles / Églises / Usines</option>
          <option value="commerces">Commerces & Hôtels</option>
          <option value="patrimoine">Patrimoines Culturels</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-(--color-muted) text-sm py-12">
          Aucune commune ne correspond à ces critères.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((c) => {
            const infraCount = c.ecoles.length + c.eglises.length + c.usines.length;
            return (
              <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold uppercase px-2 py-1 rounded-full bg-(--color-fond) text-(--color-mada-vert)">
                    {c.type_commune === "URBAINE" ? "Urbaine" : "Rurale"}
                  </span>
                  <span className="text-xs text-(--color-muted)">{c.district_nom}</span>
                </div>
                <h3 className="font-(family-name:--font-heading) text-2xl mb-3">{c.nom}</h3>

                <ul className="space-y-1.5 text-sm text-(--color-muted) mb-4">
                  <li className="flex items-center gap-2">
                    <School size={15} /> Écoles / Églises / Usines
                    <span className="ml-auto font-semibold text-(--color-texte)">{infraCount}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShoppingBag size={15} /> Commerces & Hôtels
                    <span className="ml-auto font-semibold text-(--color-texte)">
                      {c.etablissements.length} dispo.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Landmark size={15} /> Patrimoines Culturels
                    <span className="ml-auto font-semibold text-(--color-texte)">
                      {c.sites_culturels.length > 0 ? c.sites_culturels.length : "Aucun"}
                    </span>
                  </li>
                </ul>

                <Link
                  href={`/districts/${c.district_slug}`}
                  className="text-sm font-medium text-(--color-mada-vert) hover:text-(--color-mada-rouge) transition-colors"
                >
                  Voir les détails du territoire →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}