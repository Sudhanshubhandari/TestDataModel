import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ParticularValidation from './pages/ParticularValidation';
import ProfileValidation from './pages/ProfileValidation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/particular-validation"
          element={<Navigate to="/particular-validation/form?type=text" />}
        />
        <Route path="/particular-validation/form" element={<ParticularValidation />} />
        <Route path="/profile-validation" element={<ProfileValidation />} />
      </Routes>
    </BrowserRouter>
  );
}
