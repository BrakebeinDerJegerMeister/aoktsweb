// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { GameData } from '@root/core/io/GameData';
import { FormattedDate } from '@components/FormattedDate';
import { SType } from '@root/core/types/SType';

interface Props {
  infos: any,
  gameData: GameData
}

const Tab1Component: React.FC<Props> = ({ infos, gameData }) => {

  const [dataToDownload, setDataToDownload] = useState<Uint8Array>();

  const downloadData = () => {
    if (dataToDownload) {
      const blob = new Blob([dataToDownload], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = gameData.baseName + ".dat";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (!gameData) return;
    //console.log(gameData.header?.get("usedSets").getValue());
    setDataToDownload(gameData.inflatedData)
  }, [gameData]);

  return (
    <div>
      {
        gameData && gameData.header &&
        <div>
          <ul>
            <li>Version : {gameData.header?.get("version").getValue()}</li>
            <li>Long version : {gameData.scenario?.get("scenarioHeader").get("version").getValue()}</li>
            <li>{gameData.version2}</li>
            <br></br>
            <li>Original filename : {gameData.scenario?.get("scenarioHeader").get("originalFilename")?.getValue()}</li>
            <br></br>
            <li>Game Edition : {gameData.header?.get("gameEdition")?.getValue()}</li>
            <li>Used Sets Count : {gameData.header?.get("usedSetsCount")?.getValue()}</li>
            <li>Used Sets : {gameData.header?.get("usedSets")?.getValue()?.map((el:SType<any>, i: number) => {
              return <p key={i}>{el.getValue()}</p>
            })}</li>
            <br></br>
            <li>Date : {<FormattedDate timestamp={gameData.header?.get("lastSaveTimestamp")?.getValue() * 1000} />}</li>
            <li>Header Type : {gameData.header?.get("headerType")?.getValue()}</li>
          </ul>
        </div>
      }
      {
        <div>
          {
            infos && Object.entries(infos).map(([key, value], i) => (
              <p key={i}>{`${key} : ${value}`}</p>
            ))
          }
        </div>
      }
      <br />
      {
        dataToDownload && <button onClick={downloadData}>Download Data</button>
      }
    </div>
  );
};

export default Tab1Component;