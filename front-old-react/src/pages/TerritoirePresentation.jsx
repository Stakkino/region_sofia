import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { School, Church, Factory, ShoppingBag, Sparkles, MapPin, Search, Layers } from 'lucide-react';
import { getDistricts } from '../services/api'; 

const TerritoirePresentation = () => {
  const [communesList, setCommunesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedBloc, setSelectedBloc] = useState('ALL');

  useEffect(() => {
    let isMounted = true;

    getDistricts()
      .then((res) => {
        if (isMounted && res.data && Array.isArray(res.data)) {
          const extractedCommunes = [];
          
          res.data.forEach(district => {
            if (district.communes && Array.isArray(district.communes)) {
              
              district.communes.forEach(commune => {
                
                const countEcoles = commune.infrastructures ? commune.infrastructures.filter(i => i.type === 'ECOLE' || i.categorie === 'ECOLE').length : 0;
                const countEglises = commune.infrastructures ? commune.infrastructures.filter(i => i.type === 'EGLISE' || i.categorie === 'EGLISE').length : 0;
                const countUsines = commune.infrastructures ? commune.infrastructures.filter(i => i.type === 'USINE' || i.categorie === 'USINE').length : 0;
                const countCommerces = commune.etablissements ? commune.etablissements.length : 0;
                const countCulturels = commune.culturels ? commune.culturels.length : 0;

                extractedCommunes.push({
                  id: commune.id,
                  nom: commune.nom,
                  type_commune: commune.type_commune || 'RURALE',
                  district_nom: district.nom, 
                  nb_ecoles: countEcoles,
                  nb_eglises: countEglises,
                  nb_usines: countUsines,
                  nb_commerces: countCommerces,
                  nb_sites_culturels: countCulturels
                });
              });
            }
          });

          setCommunesList(extractedCommunes);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        if (isMounted) {
          setError("Erreur de chargement des données depuis le serveur.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCommunes = communesList.filter(c => {
    const nomCommune = c.nom ? c.nom.toLowerCase() : '';
    const nomDistrict = c.district_nom ? c.district_nom.toLowerCase() : '';
    
    const matchesSearch = nomCommune.includes(searchQuery.toLowerCase()) || 
                          nomDistrict.includes(searchQuery.toLowerCase());
                          
    const matchesDistrict = selectedDistrict === 'ALL' || c.district_nom === selectedDistrict;
    
    let matchesBloc = true;
    if (selectedBloc === 'INFRA') matchesBloc = (c.nb_ecoles + c.nb_eglises + c.nb_usines) > 0;
    if (selectedBloc === 'COMMERCE') matchesBloc = c.nb_commerces > 0;
    if (selectedBloc === 'CULTURE') matchesBloc = c.nb_sites_culturels > 0;

    return matchesSearch && matchesDistrict && matchesBloc;
  });

  const districtsList = ['ALL', ...new Set(communesList.map(c => c.district_nom).filter(Boolean))];

  if (loading) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#fff', letterSpacing: '0.1em' }}>Chargement des données territoriales...</p>
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
        
        {/* En-tête  */}
        <div style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          <span style={{ color: '#FFB300', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: '600' }}>
            Présentation Globale
          </span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', color: '#ffffff', margin: '0.5rem 0 0 0' }}>
            Analyse des Blocs Territoriaux
          </h1>
          <p style={{ color: '#a3b8ae', margin: '0.5rem 0 0 0', fontSize: '1.05rem' }}>
            Synthèse des infrastructures, commerces et sites culturels par commune.
          </p>
        </div>

        {/* Barre de filtres  */}
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
              <option value="COMMERCE" style={{ backgroundColor: '#0A110E' }}>Commerces & Établissements</option>
              <option value="CULTURE" style={{ backgroundColor: '#0A110E' }}>Patrimoines Culturels</option>
            </select>
          </div>
        </div>

        {/* Grid -> carte chq Commune */}
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
                      {c.district_nom}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#a3b8ae', backgroundColor: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {c.type_commune}
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
                        {c.nb_ecoles} / {c.nb_eglises} / {c.nb_usines}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: '#a3b8ae', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={15} style={{ color: '#2E7D32' }} /> Commerces & Hôtels
                      </span>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>
                        {c.nb_commerces} dispo.
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: '#a3b8ae', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles size={15} style={{ color: '#FFB300' }} /> Patrimoines Culturels
                      </span>
                      <span style={{ color: c.nb_sites_culturels > 0 ? '#FFB300' : '#a3b8ae', fontWeight: '600' }}>
                        {c.nb_sites_culturels > 0 ? `${c.nb_sites_culturels} répertorié(s)` : 'Aucun'}
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
              Aucune donnée disponible pour cette sélection.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default TerritoirePresentation;