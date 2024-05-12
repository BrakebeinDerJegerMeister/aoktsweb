// Tab1Component.tsx
import React, { useEffect, useState } from 'react';
import { FileData, FileInfo } from '../hooks/useFileHandler';
import { readScenario } from '../structs/headers/headerv2';

interface Props {
  fileData: FileData | null;
}

const Tab1Component: React.FC<Props> = ({ fileData }) => {
  const [infos, setInfos] = useState<FileInfo | null>(null);
  const [myData, setMyData] = useState({});

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
    setMyData({
      "version": decoder.decode(versionBuffer),
      "length": myDataView.getInt32(4, true),
      "headerType": myDataView.getInt32(8, true)
    });
    readScenario(fileData.arrayBuffer);
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
    </div>
  );
};

export default Tab1Component;