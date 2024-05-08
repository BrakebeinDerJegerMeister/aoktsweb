import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ScenarioPage from '../pages/ScenarioPage';
import Tab1Component from '../tabs/Tab1Component';
import Tab2Component from '../tabs/Tab2Component';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scenario/*" element={<ScenarioPage />}>
        <Route path="tab1" element={<Tab1Component />} />
        <Route path="tab2" element={<Tab2Component />} />
      </Route>
      {/* Ajoutez d'autres routes au besoin */}
    </Routes>
  );
};

export default AppRouter;
