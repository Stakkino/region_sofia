import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DistrictDetail from './pages/DistrictDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* La route dynamique avec l'ID du district */}
        <Route path="/district/:id" element={<DistrictDetail />} />
      </Routes>
    </Router>
  );
}

export default App;