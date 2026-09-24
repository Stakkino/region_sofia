import React from 'react';
import { Mail, Phone, Building2 } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer" style={{
            backgroundColor: '#060B09',
            color: '#a3b8ae',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '5rem 2rem 2rem 2rem',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 'auto'
        }}>
            <div className="footer-container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                marginBottom: '4rem'
            }}>
                
                {/* ── COLONNE 1 :  Territoire ndrek avenir── */}
                <div className="footer-col-brand">
                    <span style={{ color: '#00A3E0', fontWeight: 'bold', letterSpacing: '0.15em', fontSize: '1.8rem', display: 'block', marginBottom: '0.5rem' }}>SOFIA</span>
                    <p style={{ color: '#FFB300', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', fontWeight: '600', margin: '0 0 1.5rem 0' }}>
                        Territoire & Avenir
                    </p>
                    <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: '#c2d1c9' }}>
                        Système d'Intelligence Territoriale dédié au développement, à la valorisation culturelle et à la promotion de la Région Sofia.
                    </p>
                </div>

                {/* ── COLONNE 2 : mpiaramiasa ── */}
                <div className="footer-col-partners">
                    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 'normal', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Building2 size={18} style={{ color: '#2E7D32' }} /> Partenariats
                    </h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                        Vous souhaitez intégrer votre établissement, école ou projet sur notre plateforme numérique ?
                    </p>
                    <a href="mailto:jhenstakkino@gmail.com" style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(46, 125, 50, 0.15)',
                        color: '#fff',
                        border: '1px solid #2E7D32',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2E7D32'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(46, 125, 50, 0.15)'}
                    >
                        Proposer un établissement
                    </a>
                </div>

                {/* ── COLONNE 3 : CONTACT ── */}
                <div className="footer-col-contact">
                    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 'normal' }}>
                        Contact & Support
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail size={16} style={{ color: '#00A3E0' }} />
                            <a href="mailto:jhenstakkino@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>jhenstakkino@gmail.com</a>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                            <Phone size={16} style={{ color: '#00A3E0', marginTop: '3px' }} />
                            <div>
                                <a href="tel:+261388086533" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+261 38 80 865 33</a>
                                <a href="tel:+261324955940" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+261 32 49 559 40</a>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* ── COLONNE 4 : SOCIAL MEDIA ── */}
                <div className="footer-col-social">
                    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 'normal' }}>
                        Réseaux Sociaux
                    </h4>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1.2rem' }}>Suivez l'actualité et échangez avec notre équipe en ligne.</p>
                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                        
                        {/* Facebook (SVG) */}
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#a3b8ae', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1877F2'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b8ae'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        
                        {/* Instagram (SVG) */}
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#a3b8ae', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#E1306C'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b8ae'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        
                        {/* WhatsApp / MessageCircle (SVG) */}
                        <a href="https://wa.me/261388086533" target="_blank" rel="noreferrer" style={{ color: '#a3b8ae', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#25D366'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b8ae'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                        
                    </div>
                </div>

            </div>

            {/* ── BAS DU FOOTER ── */}
            <div className="footer-bottom" style={{
                borderTop: '1px solid rgba(255,255,255,0.04)',
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                textAlign: 'center'
            }}>
                <p style={{ margin: 0, color: '#c2d1c9' }}>Développé par <strong>NJAKANERA Nostos Duk'S Stakkino</strong></p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.2)' }}>© {currentYear} Digital Sofia System — Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;