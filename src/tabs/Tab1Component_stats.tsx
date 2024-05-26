// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { GameData } from '@root/core/io/GameData';

interface Props {
  infos : any,
  data : GameData
}

const Tab1Component: React.FC<Props> = ({ infos, data }) => {

  const [dataToDownload, setDataToDownload] = useState<Uint8Array>();

  const downloadData = () => {
    if (dataToDownload) {
      const blob = new Blob([dataToDownload], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.baseName + ".dat";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (!data) return;
    console.log(data.scenario)
    //console.clear();
    /*let scenario = readScenario(fileData.arrayBuffer, data);
    let compressedData = scenario.get("mainHeader").get("compressedData").getValue();
    data = {
      ...data, ...{
        "version 2": scenario.get("scenarioHeader").get("version").getValue(),
        //"conquestMode": scenario.get("scenarioHeader").get("conquestMode").getValue(),
        //"missionItemsCounter": scenario.get("scenarioHeader").get("missionItemsCounter").getValue(),
        //"missionAvailable": scenario.get("scenarioHeader").get("missionAvailable").getValue(),
        //"missionTimeline": scenario.get("scenarioHeader").get("missionTimeline").getValue(),
        //"originalFilename": scenario.get("scenarioHeader").get("originalFilename").getValue(),
      }
    }
    setDataToDownload(compressedData);*/
    setDataToDownload(data.inflatedData)
  }, [data]);

  return (
    <div>
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
      {/* <div>
        {
          Object.entries(myData).map(([key, value], i) => (
            <p key={i}>{`${key} : ${value}`}</p>
          ))
        }
      </div> */}
      {dataToDownload && (
        <button onClick={downloadData}>Download Data</button>
      )}
    </div>
  );
};

export default Tab1Component;