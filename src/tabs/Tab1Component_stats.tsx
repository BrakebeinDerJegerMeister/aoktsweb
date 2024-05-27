// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { GameData } from '@root/core/io/GameData';
import { FormattedDate } from '@components/FormattedDate';

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
    setDataToDownload(gameData.inflatedData)
  }, [gameData]);

  return (
    <div>
      {
        gameData && gameData.header &&
        <div>
          <li>{gameData.header?.get("version").getValue()}</li>
          <li>{gameData.scenario?.get("scenarioHeader").get("version").getValue()}</li>
          <li>{gameData.version2}</li>
          <li>{gameData.scenario?.get("scenarioHeader").get("originalFilename").getValue()}</li>
          <li>{<FormattedDate timestamp={gameData.header?.get("lastSaveTimestamp").getValue() * 1000} />}</li>
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