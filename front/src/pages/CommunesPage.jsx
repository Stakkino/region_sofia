import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Filter, Layers } from 'lucide-react';
import { getDistricts } from '../services/api'; 

const CommunesPage = () => {
  const [districtsRaw, setDistrictsRaw] = useState([]);
  const [allCommunes, setAllCommunes] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDistricts()
      .then((res) => {
        if (res && res.data) {
          setDistrictsRaw(res.data);
          
          // SUM tout les commune dans touts les district
          let extractedCommunes = [];
          res.data.forEach(district => {
            if (Array.isArray(district.communes)) {
              // Asiana 'district_nom' direct ao amin'ny commune mba ho mora fampisehoana
              const communesWithDistrictInfo = district.communes.map(c => ({
                ...c,
                district_nom: district.nom || district.name,
                district_id: district.id
              }));
              extractedCommunes = [...extractedCommunes, ...communesWithDistrictInfo];
            }
          });
          setAllCommunes(extractedCommunes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fakan-ddata Communes avy amin'ny Districts:", err);
        setLoading(false);
      });
  }, []);

  // Calcul : Firy ny district managna commune efa voasoratra ato?
  const activeDistrictsCount = districtsRaw.filter(d => 
    Array.isArray(d.communes) && d.communes.length > 0
  ).length;

  //  Filtre: chq ny District + Recherche
  const filteredCommunes = allCommunes.filter(c => {
    // District
    const matchesDistrict = selectedDistrictId === 'ALL' || c.district_id === Number(selectedDistrictId);
    
    // Recherche
    const search = searchTerm.toLowerCase();
    const matchesSearch = c.nom?.toLowerCase().includes(search) || 
                          c.type_commune?.toLowerCase().includes(search) ||
                          c.district_nom?.toLowerCase().includes(search);
                          
    return matchesDistrict && matchesSearch;
  });

  if (loading) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#fff', letterSpacing: '0.1em' }}>Chargement des communes...</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0A110E', minHeight: '100vh', padding: '8rem 2rem 4rem 2rem', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* lohany */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', margin: '0 0 0.5rem 0' }}>
            Les Communes
          </h1>
          <p style={{ color: '#a3b8ae', margin: 0 }}>Gestion globale et répartition territoriale des municipalités.</p>
        </div>

        {/* Calcul automatique */}
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '12px', 
          padding: '1.5rem', 
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '0.85rem', color: '#a3b8ae', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Total Communes Enregistrées</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00A3E0' }}>{allCommunes.length}</div>
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} className="hidden md:block"></div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '0.85rem', color: '#a3b8ae', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Districts Actifs (avec Communes)</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFB300' }}>{activeDistrictsCount} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#a3b8ae' }}>/ {districtsRaw.length}</span></div>
          </div>
        </div>

        {/* controle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          
          {/* filtre chq district (boutton/recherche) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#a3b8ae', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={16} /> Filtrer par District:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedDistrictId('ALL')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: selectedDistrictId === 'ALL' ? '#00A3E0' : 'rgba(255,255,255,0.1)',
                  backgroundColor: selectedDistrictId === 'ALL' ? 'rgba(0, 163, 224, 0.1)' : 'transparent',
                  color: selectedDistrictId === 'ALL' ? '#00A3E0' : '#fff',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                Tous ({allCommunes.length})
              </button>
              
              {districtsRaw.map(d => {
                const count = Array.isArray(d.communes) ? d.communes.length : 0;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrictId(d.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: selectedDistrictId === d.id ? '#00A3E0' : 'rgba(255,255,255,0.05)',
                      backgroundColor: selectedDistrictId === d.id ? 'rgba(0, 163, 224, 0.1)' : 'rgba(255,255,255,0.02)',
                      color: selectedDistrictId === d.id ? '#00A3E0' : (count === 0 ? '#556b60' : '#fff'),
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                    disabled={count === 0} 
                    title={count === 0 ? "Aucune commune enregistrée" : ""}
                  >
                    {d.nom || d.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bar de recherche */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#a3b8ae', display: 'flex' }}>
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Rechercher une commune par nom, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '30px',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00A3E0'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
            />
          </div>
        </div>

        {/* Tableaux */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#FFB300', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Nom de la Commune</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#FFB300', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Type</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#FFB300', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>District rattaché</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#FFB300', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Population</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#FFB300', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommunes.length > 0 ? (
                  filteredCommunes.map((commune) => (
                    <tr 
                      key={commune.id} 
                      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.02)', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1.25rem 1.5rem', fontWeight: '500', color: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={14} style={{ color: '#00A3E0' }} />
                          {commune.nom}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '4px', 
                          backgroundColor: commune.type_commune?.toUpperCase() === 'URBAINE' ? 'rgba(0, 163, 224, 0.1)' : 'rgba(255, 179, 0, 0.05)',
                          color: commune.type_commune?.toUpperCase() === 'URBAINE' ? '#00A3E0' : '#FFB300',
                          fontWeight: '600'
                        }}>
                          {commune.type_commune || 'RURALE'}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', color: '#c2d1c9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Layers size={13} style={{ color: '#a3b8ae' }} />
                          {commune.district_nom}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', color: '#ffffff' }}>
                        {commune.population ? commune.population.toLocaleString('fr-FR') : '0'} hab.
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                        <Link 
                          to={`/commune/${commune.id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: '#00A3E0',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#00A3E0'}
                        >
                          <span>Détails</span>
                          <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: '#a3b8ae' }}>
                      Aucune commune correspondante trouvée pour ce filtre.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunesPage;