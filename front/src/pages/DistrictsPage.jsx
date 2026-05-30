import React, { useEffect, useState } from 'react';
import { getDistricts } from '../services/api';
import DistrictCard from '../components/DistrictCard';

const DistrictsPage = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDistricts()
      .then((res) => {
        if (res && res.data) {
          // Ity no ahafahanao mijery ny tsinain'ny data ao amin'ny Console (F12) raha mbola misy olana
          console.log("== RAFI-DRAKITRA AVY AMIN'NY DJANGO == :", res.data);

          const formattedData = res.data.map(d => {
            // Fiarovana ny isan'ny communes miankina amin'ny field nalefan'ny Django
            let count = 0;
            if (typeof d.communes_count === 'number') {
              count = d.communes_count;
            } else if (typeof d.communesCount === 'number') {
              count = d.communesCount;
            } else if (typeof d.nombre_communes === 'number') {
              count = d.nombre_communes;
            } else if (Array.isArray(d.communes)) {
              // Raha toa ka lisitra array ny communes no averin'ny Django fa tsy isa
              count = d.communes.length;
            }

            return {
              id: d.id,
              name: d.nom || d.name, 
              description: d.description,
              communesCount: count,
              image: d.image
            };
          });
          
          setDistricts(formattedData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fakan-ddata Districts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#fff', letterSpacing: '0.1em' }}>Chargement des districts...</p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0A110E', minHeight: '100vh', padding: '8rem 2rem 4rem 2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', marginBottom: '0.5rem' }}>
            Les Districts de la Région
          </h1>
          <p style={{ color: '#a3b8ae', fontSize: '1.1rem' }}>Explorez les différents territoires et leurs communes</p>
        </div>

        {/* Ny Grid mampiseho an'ireo Karatra */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {districts.length > 0 ? (
            districts.map((district) => (
              <DistrictCard key={district.id} district={district} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#a3b8ae', padding: '3rem' }}>
              Aucun district trouvé ou problème de connexion avec le serveur.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DistrictsPage;