// ScenarioPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from '../tabs/Tab1Component_stats';
import Tab2Component from '../tabs/Tab2Component';
import { FileData } from '../hooks/useFileHandler';

const ScenarioPage: React.FC = () => {
  const location = useLocation();
  const [fileData,setFileData] = useState(location.state?.fileData as FileData | null);

  useEffect(() => {
    const data = location.state?.fileData as FileData | null;
    if (data) {
      setFileData(data);
    }
  }, [location.state]);
  
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
