import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { School, Church, Factory, ShoppingBag, Sparkles, MapPin, Search, Layers } from 'lucide-react';
// Andalana faha-4: Ampiasaina mivantana izao ilay function mba tsy hisy error 'no-unused-vars'
import { getTerritoirePresentation } from '../services/api'; 

const TerritoirePresentation = () => {
  const [communesData, setCommunesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Fitantanana fahadisoana raha dila ny serveur
  
  // Fitantanana ny sivana (Filtres)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedBloc, setSelectedBloc] = useState('ALL');

  useEffect(() => {
    let isMounted = true;

    // ANTSO TENA IZY ANY AMIN'NY DJANGO BACKEND
    getTerritoirePresentation()
      .then((res) => {
        if (isMounted) {
          // res.data dia tokony handefa lisitra avy amin'ny serializer-nao
          setCommunesData(res.data); 
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur de connexion avec Django:", err);
        if (isMounted) {
          setError("Tsy tafa ny fifandraisana amin'ny Backend. Hamarino ny Django.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // LOJIKA SIVANA (FILTER LOGIC)
  const filteredCommunes = communesData.filter(c => {
    // Hamarinina raha misy ny data vao itadiavana mba hisorohana ny crash raha misy banga ny Django
    const nomCommune = c.nom ? c.nom.toLowerCase() : '';
    const nomDistrict = c.district_nom ? c.district_nom.toLowerCase() : '';
    
    const matchesSearch = nomCommune.includes(searchQuery.toLowerCase()) || 
                          nomDistrict.includes(searchQuery.toLowerCase());
                          
    const matchesDistrict = selectedDistrict === 'ALL' || c.district_nom === selectedDistrict;
    
    let matchesBloc = true;
    const nbEcoles = c.nb_ecoles || 0;
    const nbEglises = c.nb_eglises || 0;
    const nbUsines = c.nb_usines || 0;
    const nbCommerces = c.nb_commerces || 0;
    const nbCulturels = c.nb_sites_culturels || 0;

    if (selectedBloc === 'INFRA') matchesBloc = (nbEcoles + nbEglises + nbUsines) > 0;
    if (selectedBloc === 'COMMERCE') matchesBloc = nbCommerces > 0;
    if (selectedBloc === 'CULTURE') matchesBloc = nbCulturels > 0;

    return matchesSearch && matchesDistrict && matchesBloc;
  });

  // Lisitry ny district rehetra tsy miverina ho an'ny sivana
  const districtsList = ['ALL', ...new Set(communesData.map(c => c.district_nom).filter(Boolean))];

  if (loading) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#fff', letterSpacing: '0.1em' }}>Centralisation des blocs territoriaux...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ color: '#ff8a80', border: '1px solid rgba(211,47,47,0.3)', padding: '1.5rem', borderRadius: '8px', backgroundColor: 'rgba(211,47,47,0.05)' }}>{error}</p>
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
        
        {/* ── TITRE PRINCIPAL ── */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          <span style={{ color: '#FFB300', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: '600' }}>
            Vue Globale Épurée
          </span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', color: '#ffffff', margin: '0.5rem 0 0 0' }}>
            Analyse & Présentation des Blocs
          </h1>
          <p style={{ color: '#a3b8ae', margin: '0.5rem 0 0 0', fontSize: '1.05rem' }}>
            Suivi en temps réel des infrastructures, commerces et richesses culturelles de la Région Sofia.
          </p>
        </div>

        {/* ── BARRE DE FILTRES ── */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap', 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          padding: '1.25rem', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.03)',
          marginBottom: '2.5rem',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', flex: '1', minWidth: '250px' }}>
            <Search size={16} style={{ color: '#a3b8ae' }} />
            <input 
              type="text" 
              placeholder="Rechercher une commune..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} style={{ color: '#00A3E0' }} />
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}
            >
              {districtsList.map(d => (
                <option key={d} value={d} style={{ backgroundColor: '#0A110E' }}>{d === 'ALL' ? 'Tous les Districts' : d}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={16} style={{ color: '#FFB300' }} />
            <select 
              value={selectedBloc} 
              onChange={(e) => setSelectedBloc(e.target.value)}
              style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ backgroundColor: '#0A110E' }}>Tous les Blocs</option>
              <option value="INFRA" style={{ backgroundColor: '#0A110E' }}>Infrastructures Actives</option>
              <option value="COMMERCE" style={{ backgroundColor: '#0A110E' }}>Commerces & Hôtels</option>
              <option value="CULTURE" style={{ backgroundColor: '#0A110E' }}>Patrimoines Culturels</option>
            </select>
          </div>
        </div>

        {/* ── GRID DES CARTES ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredCommunes.length > 0 ? (
            filteredCommunes.map(c => (
              <Link 
                key={c.id}
                to={`/commune/${c.id}`}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(0,163,224,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#00A3E0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                      {c.district_nom || 'Non spécifié'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#a3b8ae', backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {c.type_commune || 'RURALE'}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '0 0 1.5rem 0', fontWeight: '500', fontFamily: 'Cormorant Garamond, serif' }}>
                    {c.nom}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: '#a3b8ae', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <School size={15} style={{ color: '#00A3E0' }} /> Écoles / Églises / Usines
                      </span>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>
                        {c.nb_ecoles || 0} / {c.nb_eglises || 0} / {c.nb_usines || 0}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: '#a3b8ae', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={15} style={{ color: '#2E7D32' }} /> Établissements & Restos
                      </span>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>
                        {c.nb_commerces || 0} dispo.
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: '#a3b8ae', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles size={15} style={{ color: '#FFB300' }} /> Sites Culturels & Doany
                      </span>
                      <span style={{ color: (c.nb_sites_culturels || 0) > 0 ? '#FFB300' : '#a3b8ae', fontWeight: '600' }}>
                        {(c.nb_sites_culturels || 0) > 0 ? `${c.nb_sites_culturels} répertorié(s)` : 'Aucun'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'right', fontSize: '0.85rem', color: '#00A3E0', fontWeight: '500' }}>
                  Voir les détails du territoire →
                </div>
              </Link>
            ))
          ) : (
            <p style={{ color: '#a3b8ae', gridColumn: '1 / -1', fontSize: '1rem', textAlign: 'center', marginTop: '2rem' }}>
              Aucune commune ne correspond à vos critères de recherche.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default TerritoirePresentation;