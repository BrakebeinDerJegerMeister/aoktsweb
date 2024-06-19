// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { GameData } from '@root/core/io/GameData';
import { FormattedDate } from '@components/FormattedDate';
import { ScenarioComponents } from '@interfaces/scenarioInterfaces';

interface Props {
  gameData?: GameData,
  scenario?: ScenarioComponents,
}

const Tab1Component: React.FC<Props> = ({ gameData, scenario }) => {

  //console.log("Tab 1");
  const [dataToDownload, setDataToDownload] = useState<Uint8Array>();

  const downloadData = () => {
    if (dataToDownload) {
      if (gameData) {
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
        gameData &&  
        <div>
          <ul>
            <li>Version : {gameData.uncompressedHeader.version}</li>
            <li>Long version : {gameData.longVersion2}</li>
            <li>{gameData.version2}</li>
            <br></br>
            <li>Game Edition : {gameData.uncompressedHeader.gameEdition}</li>
            <li>Used Sets Count : {gameData.uncompressedHeader.usedSetsCount}</li>
            <li>Used Sets : {gameData.uncompressedHeader?.usedSets?.map((el: number, i: number) => {
              return <p key={i}>{el}</p>
            })}</li>
            <br></br>
            <li>Date : {gameData.uncompressedHeader.lastSaveTimestamp && <FormattedDate timestamp={gameData.uncompressedHeader.lastSaveTimestamp * 1000} />}</li>
            <li>Header Type : {gameData.uncompressedHeader.headerType}</li>
            <li>File Name : {gameData.fileName}</li>
            <li>File Extension : {gameData.fileExtension}</li>
            <li>File BaseName : {gameData.baseName}</li>
            <li>File Size : {gameData.fileSize}</li>
          </ul>
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