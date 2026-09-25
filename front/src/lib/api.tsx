const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDistricts() {
  const res = await fetch(`${API_URL}/districts/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Erreur lors du chargement des districts");
  return res.json();
}

export async function fetchDistrict(slug: string) {
  const res = await fetch(`${API_URL}/districts/${slug}/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("District introuvable");
  return res.json();
}