import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ScenarioPage from '../pages/ScenarioPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenario" element={<ScenarioPage />} />
        {/* Ajoutez d'autres routes au besoin */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
