"use client";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import Link from "next/link";

type GeoProps = { shapeName: string };

const DISTRICTS_SOFIA = [
  "Antsohihy", "Analalava", "Bealanana", "Befandriana Avaratra",
  "Mampikony", "Mandritsara", "Port-Berge", "Boriziny",
];

export default function SofiaDistrictsMap() {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [48.2, -15], scale: 9000 }}
      className="w-full h-full"
    >
      <Geographies geography="/geo/mdg-districts.json">
        {({ geographies }) => {
          const sofia = geographies.filter((geo) => {
            const props = geo.properties as GeoProps;
            return DISTRICTS_SOFIA.some((nom) => props.shapeName?.includes(nom));
          });
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
                  fill="var(--color-vert)"
                  stroke="var(--color-fond)"
                  strokeWidth={1}
                  className="opacity-85 hover:opacity-100 hover:fill-[var(--color-terracotta)] transition-opacity outline-none"
                />
                <Marker coordinates={centroid}>
                  <Link href={`/districts/${slug}`}>
                    <text
                      textAnchor="middle"
                      className="fill-[var(--color-fond)] text-[8px] font-semibold pointer-events-none"
                    >
                      {props.shapeName}
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