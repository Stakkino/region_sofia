import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRegions } from '../services/api';
import { MapPin, Wind, ArrowRight } from 'lucide-react';

const Home = () => {
    const [regionData, setRegionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const images = [
        '/assets/images/p1.jpg',
        '/assets/images/p2.jpg',
        '/assets/images/p3.jpg'
    ];

    useEffect(() => {
        getRegions().then(res => {
            if(res.data.length > 0) setRegionData(res.data[0]);
            setLoading(false);
        }).catch(() => setLoading(false));

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 6000); // Natao 6s mba hanana fotoana hisintonana ny animation zoom
        return () => clearInterval(timer);
    }, [images.length]);

    const getFeaturedDistricts = (districts) => {
        if (!districts) return [];
        const dayOfYear = Math.floor(new Date() / 8.64e7);
        const index = dayOfYear % districts.length;
        if (districts.length === 1) return [districts[0]];
        return [districts[index], districts[(index + 1) % districts.length]];
    };

    const featuredDistricts = getFeaturedDistricts(regionData?.districts);

    if (loading) return (
        <div className="loading-screen" style={{ backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="loading-inner" style={{ textAlign: 'center' }}>
                <div className="loading-logo" style={{ border: '2px solid #2E7D32', color: '#FFB300', padding: '1rem', borderRadius: '50%', fontSize: '2rem', display: 'inline-block', marginBottom: '1rem' }}>S</div>
                <p className="loading-text" style={{ color: '#fff', letterSpacing: '0.2em' }}>SYSTEME SOFIA</p>
            </div>
        </div>
    );

    return (
        <div className="home-root" style={{
            '--primary': '#00A3E0',     /* Renirano Sofia */
            '--secondary': '#2E7D32',   /* Fambolena */
            '--accent': '#FFB300',      /* Masoandro */
            backgroundColor: '#0A110E', 
            color: '#e4ebe7',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif',
            overflowX: 'hidden'
        }}>

            {/* ── CSS Injection ho an'ny Animation Moderne (Ken Burns Effect) ── */}
            <style>{`
                @keyframes kenBurns {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.12); }
                }
                .animate-zoom {
                    animation: kenBurns 6.5s ease-in-out infinite alternate;
                }
                .district-card:hover .district-img {
                    transform: scale(1.08);
                }
                .district-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(0,163,224,0.3) !important;
                }
            `}</style>

            {/* ── HERO SECTION ── */}
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '115vh', display: 'flex', alignItems: 'center', backgroundColor: '#0A110E' }}>

                {/* Slideshow Slides */}
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`hero-slide ${idx === currentSlide ? 'active animate-zoom' : ''}`}
                        style={{ 
                            backgroundImage: `url(${img})`,
                            position: 'absolute',
                            top: 0, left: 0, width: '100%', height: '100%',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: idx === currentSlide ? 0.38 : 0, 
                            transition: 'opacity 1.5s ease-in-out',
                            zIndex: 1
                        }}
                    />
                ))}

                {/* Glow effects */}
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,163,224,0.12) 0%, transparent 70%)', zIndex: 2, filter: 'blur(40px)' }} />

                {/* Vignette overlay */}
                <div className="hero-vignette" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(10,17,14,0.2), #0A110E 95%)', zIndex: 2 }} />

                {/* Content sy Carte napetraka anaty Grid milamina */}
                <div className="hero-container" style={{ position: 'relative', zIndex: 3, padding: '2rem', width: '100%', maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '3rem' }}>
                    
                    {/* Havia: Lahatsoratra */}
                    <div className="hero-content">
                        <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span className="eyebrow-line" style={{ width: '40px', height: '2px', backgroundColor: 'var(--accent)' }} />
                            <span className="eyebrow-text" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', fontWeight: '600' }}>Région Sofia · Madagascar</span>
                        </div>

                        <h1 className="hero-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4.5rem', color: '#ffffff', lineHeight: 1.1, margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>
                            L'Intelligence
                            <br />
                            <em className="hero-title-em" style={{ color: 'var(--primary)', fontStyle: 'italic', fontWeight: 'normal' }}>Territoriale</em>
                        </h1>

                        <p className="hero-subtitle" style={{ color: '#a3b8ae', fontSize: '1.2rem', maxWidth: '500px', lineHeight: 1.6, margin: '0 0 2.5rem 0' }}>
                            Explorez la Sofia à travers une immersion numérique inédite au service du développement et de la valorisation du territoire.
                        </p>

                        <div className="hero-meteo" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.75rem', borderLeft: '3px solid var(--secondary)', background: 'rgba(255,255,255,0.03)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', borderRadius: '0 12px 12px 0' }}>
                            <div className="meteo-icon-wrap" style={{ color: 'var(--accent)' }}><Wind size={20} /></div>
                            <div>
                                <p className="meteo-label" style={{ margin: 0, fontSize: '0.75rem', color: '#a3b8ae', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Météo Regional</p>
                                <span className="meteo-value" style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 'bold' }}>{regionData?.meteo_actuelle || "28°C, Ensoleillé"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Ny Sarintany Aroa (Madagascar + Zoom Sofia) */}
                    <div className="hero-maps-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', opacity: 0.85, filter: 'drop-shadow(0 0 30px rgba(0,163,224,0.15))' }}>
                        {/* Carte Madagascar*/}
                        <div style={{ position: 'relative', transition: 'transform 0.4s ease' }}>
                            <img 
                                src="/assets/images/carte-sofia.png" 
                                alt="Carte Madagascar gasy Sofia" 
                                style={{ maxWidth: '340px', height: 'auto', display: 'block' }} 
                            />
                        </div>
                        
                        {/* Carte Zoom Sofia */}
                        <div style={{ position: 'relative', transition: 'transform 0.4s ease', padding: '10px' }}>
                            <img 
                                src="/assets/images/carte-sofia-zoom.png" 
                                alt="Zoom Région Sofia" 
                                style={{ maxWidth: '290px', height: 'auto', display: 'block' }} 
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* ── SECTION INTRO ── */}
            <section className="intro-section" style={{ padding: '8rem 2rem', backgroundColor: '#0A110E', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '0', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.03) 0%, transparent 70%)', filter: 'blur(50px)' }} />
                
                <div className="intro-inner" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
                    <p className="intro-overline" style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.95rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Bienvenue</p>
                    <h2 className="intro-heading" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: '#ffffff', margin: '0 0 2rem 0', lineHeight: 1.2, fontWeight: 'normal' }}>
                        Une région d'exception,<br />une vision d'avenir.
                    </h2>
                    <p className="intro-body" style={{ color: '#c2d1c9', lineHeight: '1.8', fontSize: '1.15rem', margin: 0 }}>
                        La Sofia est l'une des régions les plus riches de Madagascar — en biodiversité, en culture, en potentiel. Découvrez ses districts, ses paysages et son âme à travers une plateforme moderne pensée pour la valorisation de notre patrimoine.
                    </p>
                </div>
            </section>

            {/* ── SECTION DISTRICTS ── */}
            <section className="districts-section" style={{ padding: '6rem 2rem', backgroundColor: '#0A110E', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="districts-header" style={{ marginBottom: '4rem' }}>
                    <span className="section-overline" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', fontWeight: '600' }}>Districts en vedette</span>
                    <h2 className="section-heading" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', color: '#ffffff', margin: '0.5rem 0 0 0', fontWeight: 'normal' }}>Explorez le territoire</h2>
                </div>

                <div className="districts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                    {featuredDistricts.map((district) => {
                        const cleanImageName = district.nom ? district.nom.toLowerCase().trim().replace(/\s+/g, '-') : 'default';
                        const districtImagePath = `assets/images/districts/${cleanImageName}.jpg`;

                        return (
                            <div key={district.id} className="district-card" style={{ 
                                position: 'relative', 
                                height: '400px', 
                                borderRadius: '16px', 
                                overflow: 'hidden', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'end', 
                                padding: '2.5rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.03)',
                                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease'
                            }}>
                                <img
                                    src={districtImagePath}
                                    className="district-img"
                                    alt={district.nom}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                                    onError={(e) => { e.target.src = `assets/images/districts/default.jpg`; }}
                                />
                                <div className="district-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 30%, rgba(10,17,14,0.95))', zIndex: 2 }} />
                                
                                <div className="district-content" style={{ position: 'relative', zIndex: 3 }}>
                                    <div className="district-pin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: '500' }}>
                                        <MapPin size={14} style={{ color: 'var(--primary)' }} />
                                        <span>Sofia, Madagascar</span>
                                    </div>
                                    <h3 className="district-name" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color: '#fff', margin: '0 0 1.5rem 0', fontWeight: 'normal' }}>{district.nom}</h3>
                                    <Link
                                        to={`/district/${district.id}`}
                                        className="district-btn"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', borderBottom: '2px solid var(--primary)', paddingBottom: '0.35rem', fontSize: '1rem', fontWeight: '500', transition: 'gap 0.2s' }}
                                    >
                                        <span>Explorer</span> <ArrowRight size={16} style={{ color: 'var(--primary)' }} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;