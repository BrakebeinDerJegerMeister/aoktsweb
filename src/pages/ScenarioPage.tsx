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
import { useHeaderSubscription2 } from '@hooks/useHeaderSubscription2';


enum myActionMode {
  "none",
  "read",
  "write",
  "create",
}




const ScenarioPage: React.FC = () => {

  const [myData, setMyData] = useState<GameData>();
  const [myEerror, setMyError] = useState<Error>();
  const [myScenario, setMyScenario] = useState<ScenarioComponents>();
  const [myAction, setMyAction] = useState<myActionMode>(myActionMode.none);
  const [mySubscriber, setMySubscriber]=useState({});

  const myFields = useRef<Record<string, FieldConfig<valueTypes>>>({});
  const [myRealFields, setMyRealFields] = useState<Record<string, FieldConfig<valueTypes>>>({});

  const location = useLocation();

  const [fileData, setFileData] = useState<FileData>(location.state?.fileData);

  useEffect(() => {
    const data: FileData = location.state?.fileData;
    if (data) {
      setFileData(data);
    }
  }, [location.state]);


  const subscriber = {};

  const subscribe = function ({ fieldName, type, read, write, create }: FieldConfig<valueTypes>) {

    myFields.current[fieldName] = {
      "fieldName": fieldName,
      "value": null,
      "rawValue": null,
      "type": type,
      "read": read,
      "write": write,
      "create": create,
    };

  }

  let uncompressedHeaderFields: MainHeaderComponents = {
    "version": <MainHeader.Version subscribe={subscribe} subscribe2={useHeaderSubscription2(setMySubscriber, "version")}/>,
    "headerLength": <MainHeader.HeaderLength subscribe={subscribe} />,
    "headerType": <MainHeader.HeaderType subscribe={subscribe} />,
    "lastSaveTimestamp": <MainHeader.LastSaveTimestamp subscribe={subscribe} />,
    "instructions": <MainHeader.Instructions subscribe={subscribe} />,
    "individualVictories": <MainHeader.IndividualVictories subscribe={subscribe} />,
    "playerCount": <MainHeader.PlayerCount />,
    "value1000": <MainHeader.Value1000 />,
    "gameEdition": <MainHeader.GameEdition />,
    "usedSetsCount": <MainHeader.UsedSetsCount />,
    "usedSets": <MainHeader.UsedSets />,
    "creatorName": <MainHeader.CreatorName />,
    "triggerCount": <MainHeader.TriggerCount />,
    "compressedData": <MainHeader.CompressedData />,
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
      console.log(mySubscriber);
        let myMainUint8Array = fileData.arrayBuffer;
        let myReader: STypeRW = {
          "index": 0,
          "dataView": new DataView(myMainUint8Array.buffer),
        }
        Object.entries(myFields.current).forEach(([_key, obj]) => {

          obj.read(myReader, obj, myFields);

        });
        console.log(myFields.current)
        console.log(scenario.uncompressedHeader.version)
        setMyRealFields({ ...myFields.current });
        setMyAction(myActionMode.none);
        break;
      default:
    }
    console.log("action terminée");
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
            <Tab>Raw Data</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tab1Component gameData={myData} scenario={myScenario} />
            </TabPanel>
            <TabPanel>
              <Tab2Component gameData={myData} scenario={myScenario} />
            </TabPanel>
            <TabPanel>
              <RawDataTab fields={myRealFields} />
            </TabPanel>

          </TabPanels>
        </Tabs>

      }
    </div >
  );
};

export default ScenarioPage;
