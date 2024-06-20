// src/pages/ScenarioPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from "@tabs/Tab1Component_stats";
import Tab2Component from '@tabs/Tab2Component';
import { FileData } from '@hooks/useFileHandler';
import { fastReadScenario } from '@root/core/io/readScenario';

import * as MainHeader from '@components/scenario/01_mainHeader';
import RawDataTab from '@tabs/RawDataTab';
import { FieldConfig, MainHeaderComponents, ScenarioComponents, valueTypes } from '@interfaces/scenarioInterfaces';
import { GameData } from '@root/core/io/GameData';
import { useCommComponent } from '@hooks/useHeaderSubscription2';
import { ascii, str, u32 } from '@utils/dataFactories';


enum myActionMode {
  "none",
  "read",
  "write",
  "create",
  "display",
}




const ScenarioPage: React.FC = () => {

  const [myData, setMyData] = useState<GameData>();
  const [myEerror, setMyError] = useState<Error>();
  const [myScenario, setMyScenario] = useState<ScenarioComponents>();
  const [myAction, setMyAction] = useState<myActionMode>(myActionMode.none);
  const mySubscriber = useRef({});

  const location = useLocation();

  const [fileData, setFileData] = useState<FileData>(location.state?.fileData);

  useEffect(() => {
    const data: FileData = location.state?.fileData;
    if (data) {
      setFileData(data);
    }
  }, [location.state]);





  let uncompressedHeaderFields: MainHeaderComponents = {
    "version": <MainHeader.Version mySubscriber={mySubscriber} />,
    "headerLength": <MainHeader.HeaderLength mySubscriber={mySubscriber}/>,
    // "headerType": <MainHeader.HeaderType mySubscriber={mySubscriber}/>,
    // "lastSaveTimestamp": <MainHeader.LastSaveTimestamp  mySubscriber={mySubscriber}/>,
    // "instructions": <MainHeader.Instructions  mySubscriber={mySubscriber}/>,
    // "individualVictories": <MainHeader.IndividualVictories  mySubscriber={mySubscriber}/>,
    // "playerCount": <MainHeader.PlayerCount />,
    // "value1000": <MainHeader.Value1000 />,
    // "gameEdition": <MainHeader.GameEdition />,
    // "usedSetsCount": <MainHeader.UsedSetsCount />,
    // "usedSets": <MainHeader.UsedSets />,
    // "creatorName": <MainHeader.CreatorName />,
    // "triggerCount": <MainHeader.TriggerCount />,
    // "compressedData": <MainHeader.CompressedData />,
  }
  let scenario: ScenarioComponents = {
    "uncompressedHeader": uncompressedHeaderFields,
  }

  useEffect(() => {
    setMyScenario(scenario);
  }, []);

  useEffect(() => {
    switch (myAction) {
      case myActionMode.read:

        //console.log(mySubscriber);

        let myMainUint8Array = fileData.arrayBuffer;


        let myReader2: STypeRW = {
          "index": 0,
          "dataView": new DataView(myMainUint8Array.buffer),
        }

        Object.entries(mySubscriber.current).forEach(([_key, subscriberElement]) => {
          subscriberElement.read(myReader2);
          console.log(subscriberElement);
          
        });

        setMyAction(myActionMode.none);
        console.log("@@ Action READ terminée");
        break;
      default:
    }
  }, [myAction]);



  useEffect(() => {
    if (!fileData) return;

    console.log(fileData)
    let myData = {} as GameData;


    try {

      fastReadScenario(fileData, myData);
    } catch (erreur) {
      console.log(erreur);
      if (erreur instanceof Error) {
        setMyError(erreur);
      }
      return;
    }
    setMyData(myData);
    setMyError(undefined);


    setMyAction(myActionMode.read);

  }, [fileData]);




  return (
    <div>
      {

        myEerror && <div>{myEerror.message}</div> ||

        <Tabs defaultIndex={0} variant="enclosed" colorScheme="green">
          <TabList flexWrap="wrap">
            <Tab>Stats</Tab>
            <Tab>Messages</Tab>
            {/* <Tab>Raw Data</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tab1Component gameData={myData} scenario={myScenario} />
            </TabPanel>
            <TabPanel>
              <Tab2Component gameData={myData} scenario={myScenario} />
            </TabPanel>
            {/* <TabPanel>
              <RawDataTab fields={myRealFields} />
            </TabPanel> */}

          </TabPanels>
        </Tabs>

      }
    </div >
  );
};

export default ScenarioPage;
