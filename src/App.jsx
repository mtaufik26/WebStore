import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Purchase from './pages/purchase/Purchase';
import Verification from './pages/purchase/Verification';
import VerificationSuccess from './pages/purchase/VerificationSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Home defaultCategory="games" />} />
        <Route path="/pulsa" element={<Home defaultCategory="pulsa" />} />
        <Route path="/emoney" element={<Home defaultCategory="emoney" />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/daftar" element={<Login initialMode="register" />} />

        {/* Transaction Purchase Routes */}
        <Route path="/games/beli/:id" element={<Purchase />} />
        <Route path="/game/beli/:id" element={<Purchase />} />
        <Route path="/pulsa/beli/:id" element={<Purchase />} />
        <Route path="/emoney/beli/:id" element={<Purchase />} />

        {/* Verification Routes */}
        <Route path="/games/beli/:id/verification" element={<Verification />} />
        <Route path="/game/beli/:id/verification" element={<Verification />} />
        <Route path="/pulsa/beli/:id/verification" element={<Verification />} />
        <Route path="/emoney/beli/:id/verification" element={<Verification />} />
        {/* Legacy aliases */}
        <Route path="/games/beli/:id/Verification" element={<Verification />} />
        <Route path="/game/beli/:id/Verification" element={<Verification />} />
        <Route path="/pulsa/beli/:id/Verification" element={<Verification />} />
        <Route path="/emoney/beli/:id/Verification" element={<Verification />} />

        {/* Verification Success Routes */}
        <Route path="/games/beli/:id/verificationsuccess" element={<VerificationSuccess />} />
        <Route path="/game/beli/:id/verificationsuccess" element={<VerificationSuccess />} />
        <Route path="/pulsa/beli/:id/verificationsuccess" element={<VerificationSuccess />} />
        <Route path="/emoney/beli/:id/verificationsuccess" element={<VerificationSuccess />} />
        {/* Legacy aliases */}
        <Route path="/games/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/game/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/pulsa/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/emoney/beli/:id/VerificationSuccess" element={<VerificationSuccess />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
