"use client";
import Link from "next/link";

const PHOTO_DURATION = 4; // secondes par photo

export default function DistrictCard({
  nom,
  slug,
  photos,
}: {
  nom: string;
  slug: string;
  photos: string[];
}) {
  const duration = PHOTO_DURATION * Math.max(photos.length, 1);

  return (
    <Link
      href={`/districts/${slug}`}
      className="group relative block h-44 rounded-2xl overflow-hidden bg-(--color-mada-vert)]"
    >
      {photos.map((url, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={url}
          alt={nom}
          className="absolute inset-0 w-full h-full object-cover"
          style={
            photos.length > 1
              ? {
                  animation: `district-fade ${duration}s infinite`,
                  animationDelay: `${-(i * PHOTO_DURATION)}s`,
                }
              : undefined
          }
        />
      ))}
      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors" />
      <h3 className="absolute bottom-4 left-4 font-(family-name:--font-heading)] text-2xl text-white">
        {nom}
      </h3>
    </Link>
  );
}