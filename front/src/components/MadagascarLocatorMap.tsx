"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

type GeoProps = { shapeName: string };

export default function MadagascarLocatorMap() {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [47, -19], scale: 2200 }}
      className="w-full h-full"
    >
      <Geographies geography="/geo/mdg-regions.json">
        {({ geographies }) =>
          geographies.map((geo) => {
            const props = geo.properties as GeoProps;
            const isSofia = props.shapeName === "Sofia";
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isSofia ? "var(--color-terracotta)" : "#E8E2D8"}
                stroke="#FAF6F0"
                strokeWidth={0.5}
                style={{ outline: "none" }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}