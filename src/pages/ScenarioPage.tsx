// src/pages/ScenarioPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from '../tabs/Tab1Component_stats';
import Tab2Component from '../tabs/Tab2Component';
import { FileData, FileInfo } from '../hooks/useFileHandler';
import { fastReadScenario, readScenario } from '@root/core/io/readScenario';
import { GameData } from '@root/core/io/GameData';
import * as MainHeader from '@components/scenario/01_mainHeader';
import RawDataTab from '@root/tabs/RawDataTab';


enum myActionMode {
  "none",
  "read",
  "write",
  "create",
}

interface FieldConfig {
  type: any;  // Essayez d'utiliser un type plus spécifique ici si possible
  valueGetter: () => any;  // Spécifiez le type de retour si possible
  valueSetter: (value: any) => void;  // Définissez le type de paramètre et de retour si possible
}

interface MainHeaderComponents {
  version: JSX.Element;
  headerLength: JSX.Element;
  headerType: JSX.Element;
  lastSaveTimestamp: JSX.Element;
  instructions: JSX.Element;
  individualVictories: JSX.Element;
  playerCount: JSX.Element;
  value1000: JSX.Element;
  gameEdition: JSX.Element;
  usedSetsCount: JSX.Element;
  usedSets: JSX.Element;
  creatorName: JSX.Element;
  triggerCount: JSX.Element;
  compressedData: JSX.Element;
}

export interface Scenario {
  mainHeader: MainHeaderComponents;
}

const ScenarioPage: React.FC = () => {
  const [infos, setInfos] = useState<FileInfo>();
  const [myData, setMyData] = useState<GameData>({});
  const [myEerror, setMyError] = useState<Error>();
  const [myScenario, setMyScenario] = useState<Scenario>();
  const [myAction, setMyAction] = useState<myActionMode>(myActionMode.none);
  const [myFields, setMyFields] = useState<Record<string, FieldConfig>>({});

  const location = useLocation();

  const [fileData, setFileData] = useState<FileData>(location.state?.fileData);

  useEffect(() => {
    const data: FileData = location.state?.fileData;
    if (data) {
      setFileData(data);
    }
  }, [location.state]);

  function subscribe(fieldName: string, type: any, valueGetter: any, valueSetter: any) {
    myFields[fieldName] = {
      "type": type,
      "valueGetter": valueGetter,
      "valueSetter": valueSetter,
    }
    setMyFields(myFields);
    //console.log(fieldName, "subscribed");
  }

  useEffect(() => {
    switch (myAction) {
      case myActionMode.read:
        console.log("Read mode activated !")
        let myMainUint8Array = fileData.arrayBuffer;
        let myReader: STypeRW = {
          "index": 0,
          "dataView": new DataView(myMainUint8Array.buffer),
        }
        Object.entries(myFields).forEach(([_key, obj]) => {
          //console.log(obj.type());
          let ret = obj.type().read(myReader);
          obj.valueSetter(ret.typedValue);
          console.log(ret.rawValue);
        });
        break;
      default:
    }
  }, [myAction]);


  useEffect(() => {
    if (!fileData) return;

    let mainHeader : MainHeaderComponents = {
      "version": <MainHeader.Version subscribe={subscribe} />,
      "headerLength": <MainHeader.HeaderLength subscribe={subscribe} />,
      "headerType": <MainHeader.HeaderType subscribe={subscribe} />,
      "lastSaveTimestamp": <MainHeader.LastSaveTimestamp subscribe={subscribe} />,
      "instructions": <MainHeader.Instructions />,
      "individualVictories": <MainHeader.IndividualVictories />,
      "playerCount": <MainHeader.PlayerCount />,
      "value1000": <MainHeader.Value1000 />,
      "gameEdition": <MainHeader.GameEdition />,
      "usedSetsCount": <MainHeader.UsedSetsCount />,
      "usedSets": <MainHeader.UsedSets />,
      "creatorName": <MainHeader.CreatorName />,
      "triggerCount": <MainHeader.TriggerCount />,
      "compressedData": <MainHeader.CompressedData />,
    }

    let scenario : Scenario = {
      "mainHeader": mainHeader,
    }

    setMyScenario(scenario);
    setMyAction(myActionMode.read);

    let myData: GameData = {};
    //let myHeader;
    //let myScenario2;

    try {
      //myHeader = fastReadScenario(fileData, myData);
      fastReadScenario(fileData, myData);
    } catch (erreur) {
      console.log(erreur);
      if (erreur instanceof Error) {
        setMyError(erreur);
      }
      return;
    }

    try {
      //myScenario2 = readScenario(fileData, myData);
      readScenario(fileData, myData);
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

        myEerror && <div>{myEerror.message}</div> ||

        <Tabs defaultIndex={0} variant="enclosed" colorScheme="green">
          <TabList flexWrap="wrap">
            <Tab>Stats</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Raw Data</Tab>
            {/* Ajouter plus de Tab selon le besoin */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tab1Component infos={infos} gameData={myData} scenario={myScenario} />
            </TabPanel>
            <TabPanel>
              <Tab2Component scenario={myScenario} />
            </TabPanel>
            <TabPanel>
              <RawDataTab scenario={myScenario} />
            </TabPanel>
            {/* Ajouter plus de TabPanel selon le contenu de chaque onglet */}
          </TabPanels>
        </Tabs>

      }
    </div>
  );
};

export default ScenarioPage;
