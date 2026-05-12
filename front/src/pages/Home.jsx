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

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        getRegions().then(res => {
            if(res.data.length > 0) setRegionData(res.data[0]);
            setLoading(false);
        }).catch(() => setLoading(false));

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const getFeaturedDistricts = (districts) => {
        if (!districts) return [];
        const dayOfYear = Math.floor(new Date() / 8.64e7);
        const index = dayOfYear % districts.length;
        return [districts[index], districts[(index + 1) % districts.length]];
    };

    const featuredDistricts = getFeaturedDistricts(regionData?.districts);

    if (loading) return (
        <div className="loading-screen">
            <div className="loading-inner">
                <div className="loading-logo">S</div>
                <p className="loading-text">SYSTÈME SOFIA</p>
            </div>
        </div>
    );

    return (
        <div className="home-root">

            {/* ── HERO ── */}
            <section className="hero-section">

                {/* Slideshow */}
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}

                {/* Grain overlay */}
                <div className="hero-grain" />

                {/* Dark vignette */}
                <div className="hero-vignette" />

                {/* Decorative carte */}
                <div className="hero-map-deco">
                    <img src="/assets/images/carte-sofia.png" alt="" aria-hidden="true" />
                </div>

                {/* Slide indicators */}
                <div className="hero-indicators">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`indicator-dot ${idx === currentSlide ? 'active' : ''}`}
                            aria-label={`Slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Hero content */}
                <div className="hero-content">
                    <div className="hero-eyebrow">
                        <span className="eyebrow-line" />
                        <span className="eyebrow-text">Région Sofia · Madagascar</span>
                    </div>

                    <h1 className="hero-title">
                        L'Intelligence
                        <br />
                        <em className="hero-title-em">Territoriale</em>
                    </h1>

                    <p className="hero-subtitle">
                        Explorez la Sofia à travers l'IA. Une immersion
                        technologique au service du développement.
                    </p>

                    {/* Météo card */}
                    <div className="hero-meteo">
                        <div className="meteo-icon-wrap">
                            <Wind size={18} />
                        </div>
                        <div>
                            <p className="meteo-label">Météo Régionale</p>
                            <span className="meteo-value">{regionData?.meteo_actuelle}</span>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div className="scroll-cue">
                        <span className="scroll-line" />
                        <span className="scroll-label">Découvrir</span>
                    </div>
                </div>
            </section>

            {/* ── SECTION INTRO ── */}
            <section className="intro-section">
                <div className="intro-inner">
                    <p className="intro-overline">Bienvenue</p>
                    <h2 className="intro-heading">Une région d'exception,<br />une vision d'avenir.</h2>
                    <p className="intro-body">
                        La Sofia est l'une des régions les plus riches de Madagascar — en biodiversité,
                        en culture, en potentiel. Découvrez ses districts, ses paysages et son âme
                        à travers une plateforme numérique pensée pour le voyageur exigeant.
                    </p>
                </div>
            </section>

            {/* ── DISTRICTS ── */}
            <section className="districts-section">
                <div className="districts-header">
                    <span className="section-overline">Districts en vedette</span>
                    <h2 className="section-heading">Explorez le territoire</h2>
                </div>

                <div className="districts-grid">
                    {featuredDistricts.map((district, i) => (
                        <div key={district.id} className={`district-card ${i === 0 ? 'card-large' : 'card-small'}`}>
                            <img
                                src={`/assets/images/districts/${district.nom.toLowerCase()}.jpg`}
                                className="district-img"
                                alt={district.nom}
                            />
                            <div className="district-overlay" />
                            <div className="district-content">
                                <div className="district-pin">
                                    <MapPin size={14} />
                                    <span>Sofia, Madagascar</span>
                                </div>
                                <h3 className="district-name">{district.nom}</h3>
                                <Link
                                    to={`/district/${district.id}`}
                                    className="district-btn"
                                >
                                    Explorer <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <span className="footer-logo">SOFIA</span>
                        <p className="footer-tagline">Intelligence & Territoire</p>
                    </div>
                    <div className="footer-divider" />
                    <p className="footer-author">NJAKANERA Nostos Duk'S Stakkino</p>
                    <p className="footer-copy">© {currentYear} — Digital Sofia System V1.0</p>
                </div>
            </footer>

        </div>
    );
};

export default Home;
