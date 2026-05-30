import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDistrictDetail } from '../services/api';
import { ArrowLeft, CloudSun, Map, History, ShieldAlert, Building2 } from 'lucide-react';

const DistrictDetail = () => {
    const { id } = useParams();
    const [district, setDistrict] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDistrictDetail(id)
            .then(res => {
                setDistrict(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="dd-loading" style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="dd-loading-inner" style={{ textAlign: 'center' }}>
                <div className="dd-loading-ring" style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00A3E0', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem auto' }} />
                <p className="dd-loading-text" style={{ color: '#fff', letterSpacing: '0.1em' }}>Chargement du district...</p>
            </div>
        </div>
    );

    if (!district) return (
        <div className="dd-loading" style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <p className="dd-loading-text" style={{ color: '#fff' }}>Ce district est introuvable.</p>
        </div>
    );

    // Cartographie des icônes par thématique territoriale (sans mention IA)
    const iconMap = {
        histoire: <History size={18} />,
        fady:     <ShieldAlert size={18} />,
        culture:  <History size={18} />
    };

    // Logique d'image épurée (Dossier Public)
    const districtImageName = district.nom ? district.nom.toLowerCase().trim().replace(/\s+/g, '-') : 'default';
    const districtImagePath = `assets/images/districts/${districtImageName}.jpg`;

    return (
        <div className="dd-root" style={{
            '--primary': '#00A3E0',     /* Bleu Fleuve Sofia */
            '--secondary': '#2E7D32',   /* Vert Agriculture */
            '--accent': '#FFB300',      /* Or Soleil */
            backgroundColor: '#0A110E', /* Même fond sombre premium que la page d'accueil */
            color: '#e4ebe7',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif'
        }}>

            {/* ── HERO HEADER WITH DYNAMIC IMAGE ── */}
            <header className="dd-header" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem 4rem 2rem', backgroundColor: '#0A110E', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div 
                    className="dd-header-bg" 
                    style={{ 
                        backgroundImage: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,163,224,0.15) 0%, transparent 70%), url(${districtImagePath})`,
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.35,
                        zIndex: 1
                    }} 
                />
                
                {/* Lueur bleue (Glow effect) pour donner de la profondeur */}
                <div style={{ position: 'absolute', top: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,163,224,0.1) 0%, transparent 70%)', zIndex: 2, filter: 'blur(30px)' }} />
                
                <div className="dd-header-vignette" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, #0A110E)', zIndex: 2 }} />

                <div className="dd-header-inner" style={{ position: 'relative', zIndex: 3, maxWidth: '1200px', margin: '0 auto' }}>
                    <Link to="/" className="dd-back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#a3b8ae', textDecoration: 'none', fontSize: '0.95rem', marginBottom: '3rem', transition: 'color 0.2s' }}>
                        <ArrowLeft size={16} style={{ color: 'var(--primary)' }} />
                        <span>Retour à l'accueil</span>
                    </Link>

                    <div className="dd-header-meta">
                        <span className="dd-header-overline" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: '600' }}>Région Sofia · Madagascar</span>
                        <h1 className="dd-header-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.8rem', color: '#ffffff', lineHeight: 1.2, margin: '0.5rem 0 1rem 0', fontWeight: 'normal' }}>
                            District de<br /><em style={{ color: 'var(--primary)', fontStyle: 'italic', fontWeight: 'normal' }}>{district.nom}</em>
                        </h1>
                        <p className="dd-header-sub" style={{ color: '#a3b8ae', margin: 0, fontSize: '1rem', letterSpacing: '0.05em' }}>Code postal : {district.code_postal || "---"}</p>
                    </div>
                </div>
            </header>

            {/* ── BODY ── */}
            <main className="dd-main" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="dd-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* ── COLONNE GAUCHE (CONTENUS & COMMUNES) ── */}
                    <div className="dd-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                        {/* Contenus Textuels Épurés */}
                        {district.contenus_ia && district.contenus_ia.length > 0 ? (
                            district.contenus_ia.map((info, index) => (
                                <article key={index} className="dd-card dd-card-ia" style={{ 
                                    backgroundColor: 'rgba(255,255,255,0.02)', 
                                    borderRadius: '16px', 
                                    padding: '2.5rem', 
                                    border: '1px solid rgba(255,255,255,0.03)',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                                }}>
                                    <div className="dd-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                        <span className="dd-tag-icon" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                                            {iconMap[info.type_contenu] ?? <History size={18} />}
                                        </span>
                                        <span className="dd-tag-label" style={{ color: '#ffffff', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                            {info.type_contenu === 'histoire' ? 'Histoire & Patrimoine' : 
                                             info.type_contenu === 'fady' ? 'Culture & Tabous (Fady)' : 'Culture & Traditions'}
                                        </span>
                                    </div>
                                    <p className="dd-ia-text" style={{ color: '#c2d1c9', lineHeight: '1.8', fontSize: '1.1rem', margin: 0 }}>{info.texte}</p>
                                </article>
                            ))
                        ) : (
                            <article className="dd-card dd-card-ia" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.03)' }}>
                                <div className="dd-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                    <span className="dd-tag-icon" style={{ color: 'var(--accent)' }}><History size={18} /></span>
                                    <span className="dd-tag-label" style={{ color: '#ffffff', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem' }}>Analyse Territoriale</span>
                                </div>
                                <p className="dd-ia-text" style={{ color: '#a3b8ae', lineHeight: '1.8', margin: 0 }}>Les données historiques et culturelles de ce district sont en cours de centralisation.</p>
                            </article>
                        )}

                        {/* Communes Card */}
                        <div className="dd-card" style={{ 
                            backgroundColor: 'rgba(255,255,255,0.02)', 
                            borderRadius: '16px', 
                            padding: '2.5rem', 
                            border: '1px solid rgba(255,255,255,0.03)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                        }}>
                            <div className="dd-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                                <span className="dd-tag-icon" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><Map size={18} /></span>
                                <span className="dd-tag-label" style={{ color: '#ffffff', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Communes du district</span>
                                <span className="dd-badge" style={{ backgroundColor: 'rgba(0,163,224,0.1)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginLeft: 'auto' }}>{district.nb_commune || 0}</span>
                            </div>

                            <div className="dd-communes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                                {district.communes && district.communes.length > 0 ? (
                                    district.communes.map(c => (
                                        /* ── KITIHO SY LINKA MANDROSO AMIN'NY COMMUNE DETAIL ── */
                                        <Link 
                                            key={c.id} 
                                            to={`/commune/${c.id}`} 
                                            className="dd-commune-item" 
                                            style={{ 
                                                padding: '1rem', 
                                                borderRadius: '12px', 
                                                backgroundColor: 'rgba(255,255,255,0.01)', 
                                                border: '1px solid rgba(255,255,255,0.02)', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                gap: '0.25rem',
                                                textDecoration: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.25s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                                                e.currentTarget.style.borderColor = 'rgba(0,163,224,0.2)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)';
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <span className="dd-commune-name" style={{ color: '#ffffff', fontWeight: '500' }}>{c.nom}</span>
                                            <span className="dd-commune-pop" style={{ fontSize: '0.85rem', color: '#a3b8ae' }}>
                                                {c.population ? c.population.toLocaleString('fr-FR') : '---'} habitants
                                            </span>
                                        </Link>
                                    ))
                                ) : (
                                    <p style={{ color: '#a3b8ae', fontSize: '0.9rem', gridColumn: '1 / -1', margin: 0 }}>
                                        Aucune commune enregistrée pour le moment.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── COLONNE DROITE (METEO & STATS) ── */}
                    <div className="dd-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'sticky', top: '2rem' }}>

                        {/* Météo Card */}
                        <div className="dd-card dd-card-meteo" style={{ 
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 
                            borderRadius: '16px', 
                            padding: '2rem', 
                            border: '1px solid rgba(255,255,255,0.03)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
                        }}>
                            <div className="dd-meteo-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                <div>
                                    <p className="dd-meteo-overline" style={{ margin: 0, fontSize: '0.75rem', color: '#a3b8ae', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conditions actuelles</p>
                                    <h2 className="dd-meteo-title" style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#ffffff', fontWeight: 'normal' }}>Météo locale</h2>
                                </div>
                                <div className="dd-meteo-icon" style={{ color: 'var(--accent)' }}>
                                    <CloudSun size={28} />
                                </div>
                            </div>

                            <div className="dd-meteo-temp" style={{ fontSize: '3.5rem', fontWeight: '300', color: '#ffffff', display: 'flex', alignItems: 'start', lineHeight: 1, marginBottom: '0.25rem' }}>
                                {district.meteo_info?.temp ?? '28'}
                                <span className="dd-meteo-unit" style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: '500', marginTop: '0.5rem' }}>°C</span>
                            </div>

                            <div className="dd-meteo-state" style={{ color: '#c2d1c9', fontSize: '1rem', fontWeight: '500', marginBottom: '1.5rem' }}>
                                {district.meteo_info?.etat ?? 'Ensoleillé'}
                            </div>

                            <div className="dd-meteo-divider" style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />

                            <p className="dd-meteo-desc" style={{ color: '#a3b8ae', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                {district.description_climat || "Données climatiques régionales stables pour cette période de l'année."}
                            </p>
                        </div>

                        {/* Statistiques Card */}
                        <div className="dd-card dd-card-stats" style={{ 
                            backgroundColor: 'rgba(255,255,255,0.02)', 
                            borderRadius: '16px', 
                            padding: '2rem', 
                            border: '1px solid rgba(255,255,255,0.03)'
                        }}>
                            <div className="dd-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <span className="dd-tag-icon dd-tag-icon--light" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}><Building2 size={18} /></span>
                                <span className="dd-tag-label dd-tag-label--light" style={{ color: '#ffffff', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Données territoriales</span>
                            </div>

                            <div className="dd-stats-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="dd-stat-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '0.75rem' }}>
                                    <span className="dd-stat-label" style={{ color: '#a3b8ae', fontSize: '0.95rem' }}>Superficie</span>
                                    <span className="dd-stat-value" style={{ color: '#ffffff', fontWeight: '600' }}>{district.superficie ? `${district.superficie} km²` : '---'}</span>
                                </div>
                                <div className="dd-stat-row" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '0.75rem' }}>
                                    <span className="dd-stat-label" style={{ color: '#a3b8ae', fontSize: '0.95rem' }}>Distance vers Antsohihy</span>
                                    <span className="dd-stat-value" style={{ color: '#ffffff', fontWeight: '600' }}>{district.distance_vers_antsohihy ? `${district.distance_vers_antsohihy} km` : '---'}</span>
                                </div>
                                <div className="dd-stat-row" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                                    <span className="dd-stat-label" style={{ color: '#a3b8ae', fontSize: '0.95rem' }}>Nombre de communes</span>
                                    <span className="dd-stat-value" style={{ color: 'var(--accent)', fontWeight: '600' }}>{district.nb_commune || 0}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

        </div>
    );
};

export default DistrictDetail;