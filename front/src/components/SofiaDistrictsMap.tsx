"use client";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import Link from "next/link";

type GeoProps = { shapeName: string };

// Noms EXACTS trouvés dans mdg-districts.json (geoBoundaries)
const DISTRICTS_SOFIA = [
  "Antsohihy", "Analalava", "Bealanana", "Befandriana Nord",
  "Mampikony", "Mandritsara", "Port-Berge (Boriziny-Vaovao)",
];

export default function SofiaDistrictsMap() {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [48.26, -15.28], scale: 4788 }}
      width={640}
      height={288}
      className="w-full h-full"
    >
      <Geographies geography="/geo/mdg-districts.json">
        {({ geographies }) => {
          const sofia = geographies.filter((geo) =>
            DISTRICTS_SOFIA.includes((geo.properties as GeoProps).shapeName)
          );
          return sofia.map((geo) => {
            const props = geo.properties as GeoProps;
            const centroid = geoCentroid(geo);
            const slug = props.shapeName
              .toLowerCase()
              .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9]+/g, "-");
            return (
              <g key={geo.rsmKey}>
                <Geography
                  geography={geo}
                  fill="var(--color-mada-vert)"
                  stroke="var(--color-fond)"
                  strokeWidth={1}
                  className="opacity-85 hover:opacity-100 hover:fill-[var(--color-mada-rouge)] transition-opacity outline-none"
                />
                <Marker coordinates={centroid}>
                  <Link href={`/districts/${slug}`}>
                    <text
                      textAnchor="middle"
                      className="fill-white text-[9px] font-semibold pointer-events-none"
                    >
                      {props.shapeName.split(" (")[0]}
                    </text>
                  </Link>
                </Marker>
              </g>
            );
          });
        }}
      </Geographies>
    </ComposableMap>
  );
}