// ScenarioPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from '../tabs/Tab1Component_stats';
import Tab2Component from '../tabs/Tab2Component';

const ScenarioPage: React.FC = () => {
  const location = useLocation();
  const [fileData,] = useState(location.state?.fileData as Uint8Array | null);


  return (
    <div>
      <Tabs defaultIndex={0} variant="enclosed" colorScheme="green">
        <TabList flexWrap="wrap">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          {/* Ajouter plus de Tab selon le besoin */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tab1Component fileData={fileData}/>
          </TabPanel>
          <TabPanel>
            <Tab2Component />
          </TabPanel>
          {/* Ajouter plus de TabPanel selon le contenu de chaque onglet */}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ScenarioPage;