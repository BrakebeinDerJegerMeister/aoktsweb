import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ScenarioPage from '../pages/ScenarioPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scenario" element={<ScenarioPage />} />
      {/* Ajoutez d'autres routes au besoin */}
    </Routes>
  );
};

export default AppRouter;
