import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Layers, Landmark, Compass, Info, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Mitandregny scroll mb hagnova ny fiboakan Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/', icon: <HomeIcon size={16} /> },
    { name: 'Districts', path: '/districts', icon: <Compass size={16} /> },
    { name: 'Communes', path: '/communes', icon: <Landmark size={16} /> },
    { name: 'Territoire', path: '/territoire', icon: <Layers size={16} /> },
    { name: 'À propos', path: '/a-propos', icon: <Info size={16} /> }
  ];

  const isActive = (path) => location.pathname === path;

  const handleMobileClick = () => {
    setIsMobileMenuOpen(false);
  };

  // CSS commun pour les lien
  const linkStyle = (linkPath) => ({
    color: isActive(linkPath) ? '#00A3E0' : '#e4ebe7',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: isActive(linkPath) ? '600' : '500',
    letterSpacing: '0.03em',
    opacity: isActive(linkPath) ? 1 : 0.8,
    borderBottom: isActive(linkPath) ? '2px solid #00A3E0' : '2px solid transparent',
    paddingBottom: '6px', 
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    height: '100%',
    boxSizing: 'border-box'
  });

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 1000, 
      transition: 'all 0.4s ease', 
      // plus haut (0.4), mi-scroll dia lasa matroka kokoa (0.85)
      backgroundColor: isScrolled ? 'rgba(10, 17, 14, 0.85)' : 'rgba(10, 17, 14, 0.4)', 
      backdropFilter: 'blur(12px)', 
      WebkitBackdropFilter: 'blur(12px)', 
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0.02)', 
      padding: isScrolled ? '1rem 2rem' : '1.5rem 2rem', 
      fontFamily: 'system-ui, sans-serif', 
      boxSizing: 'border-box' 
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* ── LOGO BRAND ── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#00A3E0', fontWeight: 'bold', letterSpacing: '0.15em', fontSize: '1.5rem', transition: 'transform 0.3s' }}>SOFIA</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFB300', display: 'inline-block' }} />
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-menu">
          {navLinks.map((link, idx) => (
            <React.Fragment key={idx}>
              {link.isAnchor ? (
                <a href={link.path} 
                   style={linkStyle(link.path)}
                   onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#00A3E0'; }}
                   onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.color = '#e4ebe7'; }}
                >
                  {link.name}
                </a>
              ) : (
                <Link to={link.path} 
                      style={linkStyle(link.path)}
                      onMouseEnter={(e) => { if(!isActive(link.path)) e.currentTarget.style.color = '#00A3E0'; }}
                      onMouseLeave={(e) => { if(!isActive(link.path)) e.currentTarget.style.color = '#e4ebe7'; }}
                >
                  {link.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── BUTTON (MOBILE) ── */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }} 
                className="mobile-burger-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      {isMobileMenuOpen && (
        <div style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          width: '100%', 
          backgroundColor: '#0A110E', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
          padding: '1.5rem 2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem', 
          zIndex: 999 
        }}>
          {navLinks.map((link, idx) => (
            link.isAnchor ? (
              <a key={idx} 
                 href={link.path} 
                 onClick={handleMobileClick}
                 style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}
              >
                {link.icon} <span>{link.name}</span>
              </a>
            ) : (
              <Link key={idx} 
                    to={link.path} 
                    onClick={handleMobileClick}
                    style={{ color: '#fff', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}
              >
                {link.icon} <span>{link.name}</span>
              </Link>
            )
          ))}
        </div>
      )}

      {/* Injection responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-burger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;