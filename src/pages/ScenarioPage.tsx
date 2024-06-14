// src/pages/ScenarioPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from '../components/tabs/Tab1Component_stats';
import Tab2Component from '../components/tabs/Tab2Component';
import { FileData, FileInfo } from '../hooks/useFileHandler';
import { fastReadScenario, readScenario } from '@root/core/io/readScenario';
import { GameData } from '@root/core/io/GameData';
import * as MainHeader from '@components/scenario/01_mainHeader';
import RawDataTab from '@components/tabs/RawDataTab';


enum myActionMode {
  "none",
  "read",
  "write",
  "create",
}

export interface FieldConfig {
  fieldName: string,
  type: any;
  valueGetter: () => any;
  valueSetter: React.Dispatch<React.SetStateAction<any>>;
  rawValueGetter: () => Uint8Array;
  rawValueSetter: React.Dispatch<React.SetStateAction<Uint8Array>>;
  read: Function;
  write: Function;
  create: Function;
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

  const myFields = useRef<Record<string, FieldConfig>>({});
  const [myRealFields, setMyRealFields] = useState<Record<string, FieldConfig>>({});
  const location = useLocation();

  const [fileData, setFileData] = useState<FileData>(location.state?.fileData);

  useEffect(() => {
    const data: FileData = location.state?.fileData;
    if (data) {
      setFileData(data);
    }
  }, [location.state]);




  const subscribe = function ({fieldName, type, valueGetter, valueSetter, rawValueGetter, rawValueSetter, read, write, create}:FieldConfig) {

    //console.log(fieldName, "subscribed");

    myFields.current[fieldName] = {
      "fieldName": fieldName,
      "type": type,
      "valueGetter": valueGetter,
      "valueSetter": valueSetter,
      "rawValueGetter": rawValueGetter,
      "rawValueSetter": rawValueSetter,
      "read": read,
      "write": write,
      "create": create,
    };

  }

  let mainHeader: MainHeaderComponents = {
    "version": <MainHeader.Version subscribe={subscribe} />,
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
  let scenario: Scenario = {
    "mainHeader": mainHeader,
  }

  useEffect(() => {
    setMyScenario(scenario);
  }, []);

  useEffect(() => {

    //if (Object.entries(myFields).length == 0) return;

    //if (!myScenario) return;

    //console.log("==============================")
    //console.log(myAction)
    switch (myAction) {
      case myActionMode.read:
        //console.log("@@@@ Read mode activated ! @@@@")
        let myMainUint8Array = fileData.arrayBuffer;
        let myReader: STypeRW = {
          "index": 0,
          "dataView": new DataView(myMainUint8Array.buffer),
        }
        Object.entries(myFields.current).forEach(([_key, obj]) => {

          //let ret = obj.read(myReader, obj);
          obj.read(myReader, obj, myFields);

          //obj.valueSetter(ret.typedValue);
          //obj.rawValueSetter(ret.rawValue);

        });

        setMyRealFields({ ...myFields.current });
        setMyAction(myActionMode.none);
        break;
      default:
    }
  }, [myAction]);



  useEffect(() => {
    if (!fileData) return;


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

    //console.log("setAction read")
    setMyAction(myActionMode.read);

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

            < TabPanel >
              <RawDataTab fields={myRealFields} scenario={myScenario} />
            </TabPanel>

            {/* Ajouter plus de TabPanel selon le contenu de chaque onglet */}
          </TabPanels>
        </Tabs>

      }
    </div >
  );
};

export default ScenarioPage;
