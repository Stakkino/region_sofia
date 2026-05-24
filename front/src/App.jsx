import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DistrictDetail from './pages/DistrictDetail';
import About from './pages/About';

// ── NAMPIDIRINA ETY NY NAVBAR SY FOOTER ──
// Hamarino tsara fa ao amin'ny folder "src/components/" tokoa izy roa ireto
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DistrictCard from './components/DistrictCard';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ backgroundColor: '#0A110E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* 1. Ny Navbar mipoitra ambony foana */}
        <Navbar />
        
        {/* 2. Ny votoatiny (pejy) miovaova eto afovoany */}
        <div className="main-content" style={{ flex: 1 }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/district/:id" element={<DistrictDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/districts" element={<DistrictCard />} />
          </Routes>
        </div>

        {/* 3. Ny Footer mipoitra ambany foana */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;