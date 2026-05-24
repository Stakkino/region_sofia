import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Layers } from 'lucide-react';

const DistrictCard = ({ district }) => {
  // Sécurité au cas où les données ne sont pas encore chargées
  if (!district) return null;

  return (
    <div 
      className="district-card" 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = 'rgba(0, 163, 224, 0.3)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* ── IMAGE DU DISTRICT ── */}
      <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={district.image || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80'} 
          alt={district.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Badge Nombre de Communes */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(10, 17, 14, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '0.4rem 0.8rem',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          color: '#e4ebe7'
        }}>
          <Layers size={12} style={{ color: '#FFB300' }} />
          <span>{district.communesCount || 0} Communes</span>
        </div>
      </div>

      {/* ── CONTENU TEXTE ── */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Nom du District */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <MapPin size={16} style={{ color: '#00A3E0' }} />
          <h3 style={{ 
            fontFamily: 'Cormorant Garamond, serif', 
            fontSize: '1.6rem', 
            color: '#ffffff', 
            margin: 0, 
            fontWeight: 'normal' 
          }}>
            {district.name}
          </h3>
        </div>

        {/* Résumé IA (Description) */}
        <p style={{ 
          fontSize: '0.95rem', 
          lineHeight: '1.6', 
          color: '#a3b8ae', 
          margin: '0 0 2rem 0',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {district.description || "Analyse IA en cours pour ce territoire de la Région Sofia..."}
        </p>

        {/* ── BOUTON LIEN (VERS DETAILS) ── */}
        <Link 
          to={`/district/${district.id}`} 
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(0, 163, 224, 0.05)',
            color: '#00A3E0',
            border: '1px solid rgba(0, 163, 224, 0.2)',
            padding: '0.75rem 1.2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00A3E0';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 163, 224, 0.05)';
            e.currentTarget.style.color = '#00A3E0';
          }}
        >
          <span>Explorer le territoire</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default DistrictCard;