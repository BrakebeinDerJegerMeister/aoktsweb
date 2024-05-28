// ScenarioPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from '../tabs/Tab1Component_stats';
import Tab2Component from '../tabs/Tab2Component';
import { FileData, FileInfo } from '../hooks/useFileHandler';
import { fastReadScenario, readScenario } from '@root/core/io/readScenario';
import { GameData } from '@root/core/io/GameData';

const ScenarioPage: React.FC = () => {
  const [infos, setInfos] = useState<FileInfo>();
  const [myData, setMyData] = useState<GameData>({});
  const [myEerror, setMyError] = useState<Error>();
  
  const location = useLocation();

  const [fileData, setFileData] = useState<FileData>(location.state?.fileData);

  useEffect(() => {
    const data : FileData = location.state?.fileData;
    if (data) {
      setFileData(data);
    }
  }, [location.state]);


  useEffect(() => {
    if (!fileData) return;
    let myData: GameData = {};
    let myHeader;
    let myScenario;

    try {
      myHeader = fastReadScenario(fileData, myData);
    } catch (erreur) {
      console.log(erreur);
      if (erreur instanceof Error) {
        setMyError(erreur);
      }
      return;
    }

    try {
      myScenario = readScenario(fileData, myData);
    } catch (erreur) {
      console.log(erreur);
      if (erreur instanceof Error) {
        setMyError(erreur);
      }
      return;
    }

    setInfos({
      "fileName": fileData.fileName,
      "fileSize": fileData.fileSize,
      "fileType": fileData.fileType,
    });

    setMyData(myData);
    setMyError(undefined);

  }, [fileData]);

  return (
    <div>
      {

      myEerror && <div>{ myEerror.message }</div> ||

        <Tabs defaultIndex={0} variant="enclosed" colorScheme="green">
          <TabList flexWrap="wrap">
            <Tab>Stats</Tab>
            <Tab>Tab 2</Tab>
            {/* Ajouter plus de Tab selon le besoin */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tab1Component infos={infos} gameData={myData} />
            </TabPanel>
            <TabPanel>
              <Tab2Component />
            </TabPanel>
            {/* Ajouter plus de TabPanel selon le contenu de chaque onglet */}
          </TabPanels>
        </Tabs>

      }
    </div>
  );
};

export default ScenarioPage;
