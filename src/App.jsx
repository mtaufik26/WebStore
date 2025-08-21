import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Purchase from './pages/purchase-page/Purchase';
import Verification from './pages/purchase-page/Verification';
import VerificationSuccess from './pages/purchase-page/VerificationSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/games/beli/:id" element={<Purchase />} />
        <Route path="/pulsa/beli/:id" element={<Purchase />} />
        <Route path="/emoney/beli/:id" element={<Purchase />} />
        <Route path="/games/beli/:id/Verification" element={<Verification />} />
        <Route path="/pulsa/beli/:id/Verification" element={<Verification />} />
        <Route path="/emoney/beli/:id/Verification" element={<Verification />} />
        <Route path="/games/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/pulsa/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/emoney/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
