// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { FileData, FileInfo } from '../hooks/useFileHandler';
import { readScenario } from '../core/io/readScenario';
import Pako from 'pako';

interface Props {
  fileData: FileData | null;
}

const Tab1Component: React.FC<Props> = ({ fileData }) => {
  const [infos, setInfos] = useState<FileInfo | null>(null);
  const [myData, setMyData] = useState({});
  const [dataToDownload, setDataToDownload] = useState<Uint8Array | null>(null);

  const downloadData = () => {
    if (dataToDownload) {
      const decompressedData = Pako.inflate(dataToDownload, { raw: true });
      const blob = new Blob([decompressedData], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "monFichier.dat";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (!fileData) return;
    let myDataView = new DataView(fileData.arrayBuffer.buffer);
    let versionBuffer = new Uint8Array(myDataView.buffer, 0, 4);
    const decoder = new TextDecoder();
    setInfos({
      "fileName": fileData.fileName,
      "fileSize": fileData.fileSize,
      "fileType": fileData.fileType,
    });
    let data = {
      "version": decoder.decode(versionBuffer),
      "length": myDataView.getInt32(4, true),
      "headerType": myDataView.getInt32(8, true),
    };
    console.clear();
    let scenario = readScenario(fileData.arrayBuffer, data);
    let compressedData = scenario.get("mainHeader").get("compressedData").getValue();
    data = {
      ...data, ...{
        "version 2": scenario.get("scenarioHeader").get("version").getValue(),
        /*"conquestMode": scenario.get("scenarioHeader").get("conquestMode").getValue(),
        "missionItemsCounter": scenario.get("scenarioHeader").get("missionItemsCounter").getValue(),
        "missionAvailable": scenario.get("scenarioHeader").get("missionAvailable").getValue(),
        "missionTimeline": scenario.get("scenarioHeader").get("missionTimeline").getValue(),
        "originalFilename": scenario.get("scenarioHeader").get("originalFilename").getValue(),*/
      }
    }
    setMyData(data);
    setDataToDownload(compressedData);

  }, [fileData]);

  return (
    <div>
      {
        infos && <div>
          <p>File name : {infos.fileName}</p>
          <p>File size : {infos.fileSize}</p>
        </div>
      }
      <br />
      <div>
        {
          Object.entries(myData).map(([key, value], i) => (
            <p key={i}>{`${key} : ${value}`}</p>
          ))
        }
      </div>
      {dataToDownload && (
        <button onClick={downloadData}>Download Data</button>
      )}
    </div>
  );
};

export default Tab1Component;