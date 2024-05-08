// ScenarioPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from '../tabs/Tab1Component';
import Tab2Component from '../tabs/Tab2Component';

const ScenarioPage: React.FC = () => {
  const location = useLocation();
  const [fileData,] = useState(location.state?.fileData as Uint8Array | null);


  return (
    <div>
      <nav>
        <Link to="tab1">Onglet 1</Link>
        <Link to="tab2">Onglet 2</Link>
      </nav>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList flexWrap="wrap">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          {/* Ajouter plus de Tab selon le besoin */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tab1Component />
          </TabPanel>
          <TabPanel>
            <Tab2Component />
          </TabPanel>
          {/* Ajouter plus de TabPanel selon le contenu de chaque onglet */}
        </TabPanels>
      </Tabs>
      <Outlet />
      <h1>Page de Scénario</h1>
      <p>{fileData?.byteLength}</p>
      {/* Contenu de la page de scénario */}
    </div>
  );
};

export default ScenarioPage;
