// ScenarioPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ScenarioPage: React.FC = () => {
  const location = useLocation();
  const fileData = location.state?.fileData as Uint8Array | null;


  return (
    <div>
      <h1>Page de Scénario</h1>
      <p>{ fileData?.byteLength }</p>
      {/* Contenu de la page de scénario */}
    </div>
  );
};

export default ScenarioPage;
