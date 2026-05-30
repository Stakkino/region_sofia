import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, School, Church, Factory, Hotel, Utensils, ShoppingBag, Compass, Sparkles, MapPin, Landmark } from 'lucide-react';

// ── SOLUTION MAHARITRA: NY DATA DIA APETRAKA ENY IVELAN'NY COMPONENT ──
// Izany no miantoka fa tsy mivadika ho synchronous cascading render ny Effect
const getMockCommuneData = (id) => {
  return new Promise((resolve) => {
    const data = {
      id: id,
      nom: "Antsirabe Afovoany",
      type_commune: "RURALE",
      population: 14500,
      surface: 120.5,
      latitude: -15.1234,
      longitude: 47.5678,
      district: { id: 1, nom: "Antsohihy" },
      
      // ── BLOC QUARTIER ──
      quartiers: [
        { id: 1, nom: "Ambalavato" },
        { id: 2, nom: "Tsaramandroso" },
        { id: 3, nom: "Ankiakosy" }
      ],

      // ── BLOC INFRASTRUCTURES ──
      ecoles: [
        { id: 1, nom: "EPP Antsirabe", niveau_etudes: "Jardin d'enfant à CM2", nb_eleves: 240, resultat_examen: 82.5 }
      ],
      eglises: [
        { id: 1, nom: "FJKM Ziona Vaovao", religion: "Chrétienne Protestant", est_legale: true }
      ],
      usines: [
        { id: 1, nom: "Sofia Huilerie", produits: "Huile d'arachide raffinée", nb_employes: 45, statut_legal: "En règle" }
      ],

      // ── BLOC COMMERCIAL & LIEUX ──
      etablissements: [
        { id: 1, nom: "Hôtel Fleuve Sofia", categorie: "HOTEL", etoile: 3, contact: "+261 34 xx xxx xx" },
        { id: 2, nom: "Gargote Tsara tsiro", categorie: "RESTO", etoile: 0, contact: "Tsy misy" }
      ],

      // ── BLOC IA & CULTURE ──
      sites_culturels: [
        { id: 1, nom: "Doany Magala", proprietaire: "Traditionnel / Ampanjaka", description_ia: "Toerana masina fanaovana joro sy fangatahana tsodrano amin'ny razana. Manana tantara lehibe amin'ny fiforonan'ny foko eo an-toerana.", activites_possibles: "Culte, fomba nentim-paharazana", fady_associe: "Fady ny mitondra henan-kisoa sy manao akanjo mena eo amin'ny faritra masina." }
      ],
      contenu_ia: "Ity commune rurale ity dia manana tany lonaka tsara ho an'ny fambolena voanjo sy vary. Ny fitaovana ara-panabeasana dia mbola mila fanatsarana saingy hita taratra ny ezaka eo amin'ny vokatry ny fanadinana."
    };
    
    // Alaina tahaka ny fahatarana avy amin'ny server backend (API)
    setTimeout(() => resolve(data), 50);
  });
};

const CommuneDetail = () => {
  const { id } = useParams();
  const [commune, setCommune] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Antsoina amin'ny fomba Asynchronous ilay fakan-ddata
    getMockCommuneData(id)
      .then((data) => {
        if (isMounted) {
          setCommune(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false; // Fiarovana amin'ny fitetezana pejy haingana
    };
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#fff', letterSpacing: '0.1em' }}>Chargement de la commune...</p>
      </div>
    </div>
  );

  if (!commune) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ color: '#fff' }}>Commune introuvable.</p>
    </div>
  );

  return (
    <div style={{
      backgroundColor: '#0A110E',
      color: '#e4ebe7',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '6rem 2rem 4rem 2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ── BOKOTRA RETOUR ── */}
        <Link to={`/district/${commune.district.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#a3b8ae', textDecoration: 'none', fontSize: '0.95rem', marginBottom: '2rem', transition: 'color 0.2s' }}>
          <ArrowLeft size={16} style={{ color: '#00A3E0' }} />
          <span>Retour au District de {commune.district.nom}</span>
        </Link>

        {/* ── HEADER COMMUNE ── */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem', marginBottom: '3rem' }}>
          <span style={{ color: '#FFB300', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: '600' }}>
            Commune {commune.type_commune.toLowerCase()}
          </span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', color: '#ffffff', margin: '0.5rem 0' }}>
            {commune.nom}
          </h1>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', color: '#a3b8ae', fontSize: '0.95rem' }}>
            <div>Population : <strong style={{ color: '#fff' }}>{commune.population.toLocaleString('fr-FR')} hab.</strong></div>
            {commune.surface && <div>Superficie : <strong style={{ color: '#fff' }}>{commune.surface} km²</strong></div>}
            {commune.latitude && <div>Coordonnées : <strong style={{ color: '#fff' }}>{commune.latitude}, {commune.longitude}</strong></div>}
          </div>
        </div>

        {/* ── GRID LEHIBE MANDRAFITRA NY VOTOATINY ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* COLONNE GAUCHE: BLOC INFRASTRUCTURES & COMMERCIAL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 1. BLOC INFRASTRUCTURES */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Landmark size={18} style={{ color: '#00A3E0' }} />
                Infrastructures disponibles
              </h2>

              {/* Écoles */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#FFB300', fontWeight: '500', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><School size={16}/> Écoles & Éducation</h3>
                {commune.ecoles.map(e => (
                  <div key={e.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div style={{ color: '#fff', fontWeight: '500' }}>{e.nom}</div>
                    <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Niveau: {e.niveau_etudes} | Élèves: {e.nb_eleves} | Réussite: {e.resultat_examen}%</div>
                  </div>
                ))}
              </div>

              {/* Églises */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#FFB300', fontWeight: '500', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Church size={16}/> Édifices Religieux</h3>
                {commune.eglises.map(eg => (
                  <div key={eg.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div style={{ color: '#fff', fontWeight: '500' }}>{eg.nom}</div>
                    <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Religion: {eg.religion} | Statut: {eg.est_legale ? "Légal / Enregistré" : "Non enregistré"}</div>
                  </div>
                ))}
              </div>

              {/* Usines */}
              <div>
                <h3 style={{ fontSize: '1rem', color: '#FFB300', fontWeight: '500', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Factory size={16}/> Secteur Industriel</h3>
                {commune.usines.map(u => (
                  <div key={u.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div style={{ color: '#fff', fontWeight: '500' }}>{u.nom}</div>
                    <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Produits: {u.produits} | Employés: {u.nb_employes}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. BLOC COMMERCIAL */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={18} style={{ color: '#00A3E0' }} />
                Établissements & Commerces
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {commune.etablissements.map(et => (
                  <div key={et.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                    {et.categorie === 'HOTEL' ? <Hotel size={18} style={{color: '#2E7D32'}}/> : <Utensils size={18} style={{color: '#2E7D32'}}/>}
                    <div>
                      <div style={{ color: '#fff', fontWeight: '500' }}>{et.nom}</div>
                      <div style={{ fontSize: '0.85rem', color: '#a3b8ae' }}>Catégorie: {et.categorie} {et.etoile > 0 && `| ${et.etoile}★`}</div>
                      <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Contact: {et.contact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* COLONNE DROITE: BLOC IA & CULTURE, QUARTIERS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 3. BLOC IA & CULTURE */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)', filter: 'blur(10px)' }} />
              
              <h2 style={{ fontSize: '1.1rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} style={{ color: '#FFB300' }} />
                Analyse Culturelle & IA
              </h2>

              {commune.sites_culturels.map(sc => (
                <div key={sc.id} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ color: '#fff', fontWeight: '500', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Compass size={16} style={{color: '#00A3E0'}} /> {sc.nom}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#c2d1c9', lineHeight: '1.6', margin: '0 0 1rem 0' }}>{sc.description_ia}</p>
                  
                  {sc.fady_associe && (
                    <div style={{ backgroundColor: 'rgba(211,47,47,0.05)', border: '1px solid rgba(211,47,47,0.2)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#ff8a80' }}>
                      <strong>Fady (Interdits) :</strong> {sc.fady_associe}
                    </div>
                  )}
                </div>
              ))}

              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '1.5rem 0' }} />
              <p style={{ fontSize: '0.9rem', color: '#a3b8ae', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                "{commune.contenu_ia}"
              </p>
            </section>

            {/* 4. BLOC QUARTIER */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: '1.1rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} style={{ color: '#00A3E0' }} />
                Fokontany / Quartiers ({commune.quartiers.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {commune.quartiers.map(q => (
                  <div key={q.id} style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '6px', color: '#fff', fontSize: '0.95rem' }}>
                    {q.nom}
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CommuneDetail;