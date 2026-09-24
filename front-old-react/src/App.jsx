import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import DistrictDetail from './pages/DistrictDetail';
import DistrictsPage from './pages/DistrictsPage';
import CommuneDetail from './pages/CommuneDetail';
import CommunesPage from './pages/CommunesPage';
import TerritoirePresentation from './pages/TerritoirePresentation';
import About from './pages/About';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>

      <div className="app-container" style={{ backgroundColor: '#0A110E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="main-content" style={{ flex: 1 }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/district/:id" element={<DistrictDetail />} />
            <Route path="/districts" element={<DistrictsPage />} />
            <Route path="/commune/:id" element={<CommuneDetail />} />
            <Route path="/communes" element={<CommunesPage />} />
            <Route path="/territoire" element={<TerritoirePresentation />} />
            <Route path="/a-propos" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>

    </BrowserRouter> 
  );
}

export default App;