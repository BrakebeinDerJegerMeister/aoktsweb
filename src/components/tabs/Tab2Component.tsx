//src/tabs/Tab2Component.tsx

import { ScenarioComponents } from '@interfaces/scenarioInterfaces';
import { GameData } from '@root/core/io/GameData';
import React from 'react';

interface Props {
  gameData?: GameData,
  scenario?: ScenarioComponents,
}

const Tab2Component: React.FC<Props> = ({ gameData, scenario }) => {


  return (
    <>
      <p>Tab2</p>
      {
        gameData && gameData.uncompressedHeader && Object.entries(gameData.uncompressedHeader).map(([name, comp], i) => {
          //console.log("Tab 2");
          if (name != "compressedData") return <div key={i}>{comp}</div>
        })
      }
    </>
  );
};

export default Tab2Component;