// src/pages/ScenarioPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Tab1Component from "@tabs/Tab1Component_stats";
import Tab2Component from '@tabs/Tab2Component';
import { FileData, FileInfo } from '@hooks/useFileHandler';
import { fastReadScenario, readScenario } from '@root/core/io/readScenario';

import * as MainHeader from '@components/scenario/01_mainHeader';
import RawDataTab from '@tabs/RawDataTab';
import * as dT from "@dataTypes/index";

enum myActionMode {
  "none",
  "read",
  "write",
  "create",
}


export type valueTypes = dT.U32 | dT.U16 | dT.F32 | dT.Ascii | dT.ArrayData | dT.Str | null;

export interface FieldConfig<valueTypes> {
  fieldName: string,
  type: any;
  value?: valueTypes;
  rawValue?: Uint8Array | null;
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

export interface dataObject {
  [key: string] : valueTypes;
}

const ScenarioPage: React.FC = () => {
  const [infos, setInfos] = useState<FileInfo>();
  const [myData, setMyData] = useState<dataObject>({});
  const [myEerror, setMyError] = useState<Error>();
  const [myScenario, setMyScenario] = useState<Scenario>();
  const [myAction, setMyAction] = useState<myActionMode>(myActionMode.none);

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

    switch (myAction) {
      case myActionMode.read:

        let myMainUint8Array = fileData.arrayBuffer;
        let myReader: STypeRW = {
          "index": 0,
          "dataView": new DataView(myMainUint8Array.buffer),
        }
        Object.entries(myFields.current).forEach(([_key, obj]) => {

          obj.read(myReader, obj, myFields);

        });

        setMyRealFields({ ...myFields.current });
        setMyAction(myActionMode.none);
        break;
      default:
    }
  }, [myAction]);



  useEffect(() => {
    if (!fileData) return;


    let myData: dataObject = {};


    try {

      fastReadScenario(fileData, myData);
    } catch (erreur) {
      console.log(erreur);
      if (erreur instanceof Error) {
        setMyError(erreur);
      }
      return;
    }

    try {

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
