import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, School, Church, Factory, Hotel, Utensils, ShoppingBag, Compass, Sparkles, MapPin, Landmark } from 'lucide-react';
import { getCommuneDetail } from '../services/api'; 

const CommuneDetail = () => {
  const { id } = useParams();
  const [commune, setCommune] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Connectegny ny getCommuneDetail 
    getCommuneDetail(id)
      .then((res) => {
        if (isMounted && res && res.data) {
          setCommune(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur Django:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#fff', letterSpacing: '0.1em' }}>Chargement...</p>
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
        
        {/* ── Bouton mipody ── */}
        <Link to="/territoire" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#a3b8ae', textDecoration: 'none', fontSize: '0.95rem', marginBottom: '2rem' }}>
          <ArrowLeft size={16} style={{ color: '#00A3E0' }} />
          <span>Retour à la présentation</span>
        </Link>

        {/* ── tete commun ── */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem', marginBottom: '3rem' }}>
          <span style={{ color: '#FFB300', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: '600' }}>
            Commune {commune?.type_commune || 'Spécifiée'}
          </span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', color: '#ffffff', margin: '0.5rem 0' }}>
            {commune?.nom}
          </h1>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem', color: '#a3b8ae', fontSize: '0.95rem' }}>
            <div>Population : <strong style={{ color: '#fff' }}>{commune?.population ? commune.population.toLocaleString('fr-FR') : 0} hab.</strong></div>
            {commune?.surface && <div>Superficie : <strong style={{ color: '#fff' }}>{commune.surface} km²</strong></div>}
            {commune?.latitude && <div>Coordonnées : <strong style={{ color: '#fff' }}>{commune.latitude}, {commune.longitude}</strong></div>}
          </div>
        </div>

        {/* ── grid contenu ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* colonne gauche */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 1. bolc indrastructure */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Landmark size={18} style={{ color: '#00A3E0' }} />
                Infrastructures disponibles
              </h2>

              {/* Écoles */}
              {commune?.ecoles && Array.isArray(commune.ecoles) && commune.ecoles.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', color: '#FFB300', fontWeight: '500', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><School size={16}/> Écoles & Éducation</h3>
                  {commune.ecoles.map(e => (
                    <div key={e.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                      <div style={{ color: '#fff', fontWeight: '500' }}>{e.nom}</div>
                      <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Niveau: {e.niveau_etudes} | Élèves: {e.nb_eleves}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Églises */}
              {commune?.eglises && Array.isArray(commune.eglises) && commune.eglises.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', color: '#FFB300', fontWeight: '500', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Church size={16}/> Édifices Religieux</h3>
                  {commune.eglises.map(eg => (
                    <div key={eg.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                      <div style={{ color: '#fff', fontWeight: '500' }}>{eg.nom}</div>
                      <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Religion: {eg.religion}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Usines */}
              {commune?.usines && Array.isArray(commune.usines) && commune.usines.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#FFB300', fontWeight: '500', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Factory size={16}/> Secteur Industriel</h3>
                  {commune.usines.map(u => (
                    <div key={u.id} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '0.5rem' }}>
                      <div style={{ color: '#fff', fontWeight: '500' }}>{u.nom}</div>
                      <div style={{ fontSize: '0.85rem', color: '#a3b8ae', marginTop: '0.25rem' }}>Produits: {u.produits}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 2. bloc commercial */}
            {commune?.etablissements && Array.isArray(commune.etablissements) && commune.etablissements.length > 0 && (
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
                        <div style={{ fontSize: '0.85rem', color: '#a3b8ae' }}>Catégorie: {et.categorie}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>



          {/* colonne droite */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* 3. bola ia & culture */}
            {(commune?.sites_culturels || commune?.contenu_ia) && (
              <section style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h2 style={{ fontSize: '1.1rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} style={{ color: '#FFB300' }} />
                  Analyse Culturelle & IA
                </h2>

                {commune?.sites_culturels && Array.isArray(commune.sites_culturels) && commune.sites_culturels.map(sc => (
                  <div key={sc.id} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ color: '#fff', fontWeight: '500', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Compass size={16} style={{color: '#00A3E0'}} /> {sc.nom}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#c2d1c9', lineHeight: '1.6', margin: '0' }}>{sc.description_ia || sc.description}</p>
                  </div>
                ))}

                {commune?.contenu_ia && (
                  <>
                    <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', margin: '1.5rem 0' }} />
                    <p style={{ fontSize: '0.9rem', color: '#a3b8ae', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                      "{commune.contenu_ia}"
                    </p>
                  </>
                )}
              </section>
            )}

            {/* 4. bloc quartier */}
            {commune?.quartiers && Array.isArray(commune.quartiers) && (
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
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default CommuneDetail;