import React from 'react';
import { Eye, ShieldCheck, Database, MapPin, Award, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page" style={{
            backgroundColor: '#060B09',
            color: '#a3b8ae',
            fontFamily: 'system-ui, sans-serif',
            minHeight: '100vh',
            padding: '8rem 2rem 4rem 2rem'
        }}>
            {/* ── HERO SECTION ── */}
            <div className="about-hero" style={{
                maxWidth: '1000px',
                margin: '0 auto 6rem auto',
                textAlign: 'center'
            }}>
                <span style={{
                    color: '#FFB300',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '1rem'
                }}>
                    Découvrez notre mission
                </span>
                <h1 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '2.8rem',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    margin: '0 0 2rem 0',
                    lineHeight: '1.2'
                }}>
                    L'Intelligence Territoriale au service de la <span style={{ color: '#00A3E0' }}>Région Sofia</span>
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    color: '#c2d1c9',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    SOFIA (Système d'Intelligence Territoriale) est une plateforme numérique d'avant-garde conçue pour centraliser, analyser et valoriser les dynamiques de développement, le patrimoine culturel et le potentiel économique de notre territoire.
                </p>
            </div>

            {/* ── NOTRE VISION & MISSION ── */}
            <div className="about-grid-vision" style={{
                maxWidth: '1200px',
                margin: '0 auto 6rem auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '4rem'
            }}>
                {/* Vision */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '3rem',
                    borderRadius: '12px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ backgroundColor: 'rgba(0, 163, 224, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>
                            <Eye size={24} style={{ color: '#00A3E0' }} />
                        </div>
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#ffffff', margin: 0, fontWeight: 'normal' }}>
                            Notre Vision
                        </h2>
                    </div>
                    <p style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                        Devenir le hub numérique de référence pour la gouvernance locale et l'attractivité territoriale. Nous croyons qu'un développement durable et harmonieux de la Région Sofia repose sur une connaissance précise de ses réalités et sur l'accès transparent à l'information.
                    </p>
                </div>

                {/* Mission */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '3rem',
                    borderRadius: '12px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ backgroundColor: 'rgba(46, 125, 50, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>
                            <ShieldCheck size={24} style={{ color: '#2E7D32' }} />
                        </div>
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#ffffff', margin: 0, fontWeight: 'normal' }}>
                            Notre Mission
                        </h2>
                    </div>
                    <p style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                        Connecter les institutions, les acteurs économiques, les établissements d'enseignement et les citoyens. À travers la collecte de données stratégiques, SOFIA éclaire la prise de décision, stimule les partenaires locaux et fait rayonner la culture unique de la région.
                    </p>
                </div>
            </div>

            {/* ── LES PILLIERS STRATÉGIQUES (VERSION NETTOYÉE) ── */}
            <div className="about-pillars" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '6rem'
            }}>
                <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '2.5rem',
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '4rem',
                    fontWeight: 'normal'
                }}>
                    Les Piliers du Système SOFIA
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {/* Pilier 1 : Intelligence Globale */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'start', 
                        gap: '1.5rem', 
                        backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                        padding: '2rem', 
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.02)'
                    }}>
                        <div style={{ backgroundColor: 'rgba(0, 163, 224, 0.1)', padding: '0.75rem', borderRadius: '8px', flexShrink: 0 }}>
                            <Database size={24} style={{ color: '#00A3E0' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                                Intelligence Globale
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                Centralisation des indicateurs démographiques, économiques et logistiques pour une cartographie fidèle des opportunités régionales.
                            </p>
                        </div>
                    </div>

                    {/* Pilier 2 : Valorisation du Territoire */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'start', 
                        gap: '1.5rem', 
                        backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                        padding: '2rem', 
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.02)'
                    }}>
                        <div style={{ backgroundColor: 'rgba(255, 179, 0, 0.1)', padding: '0.75rem', borderRadius: '8px', flexShrink: 0 }}>
                            <MapPin size={24} style={{ color: '#FFB300' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                                Valorisation du Territoire
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                Mise en lumière des communes, des infrastructures et des initiatives locales afin de renforcer l'attractivité et le tourisme.
                            </p>
                        </div>
                    </div>

                    {/* Pilier 3 : Réseau Institutionnel */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'start', 
                        gap: '1.5rem', 
                        backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                        padding: '2rem', 
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.02)'
                    }}>
                        <div style={{ backgroundColor: 'rgba(46, 125, 50, 0.1)', padding: '0.75rem', borderRadius: '8px', flexShrink: 0 }}>
                            <Users size={24} style={{ color: '#2E7D32' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                                Réseau Éducatif &amp; Public
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                Intégration et promotion des lycées, universités, centres de formation et services publics qui bâtissent le capital humain de la région.
                            </p>
                        </div>
                    </div>

                    {/* Pilier 4 : Culture & Identité */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'start', 
                        gap: '1.5rem', 
                        backgroundColor: 'rgba(255, 255, 255, 0.01)', 
                        padding: '2rem', 
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.02)'
                    }}>
                        <div style={{ backgroundColor: 'rgba(0, 163, 224, 0.1)', padding: '0.75rem', borderRadius: '8px', flexShrink: 0 }}>
                            <Award size={24} style={{ color: '#00A3E0' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                                Culture &amp; Identité
                            </h3>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                Préservation de l'héritage historique, des traditions et du patrimoine immatériel qui font la fierté de la communauté Sofia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;