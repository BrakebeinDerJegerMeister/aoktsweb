// Tab1Component.tsx
import React, { useEffect, useState } from 'react';

interface Props {
  fileData: Uint8Array | null;
}


const Tab1Component: React.FC<Props> = ({ fileData }) => {
  console.log("Entered tab1", fileData?.byteLength);
  const [infos, setInfos] = useState({});

  useEffect(() => {
    console.log("Entered tab1");
    if (!fileData) return;
    let myDataView = new DataView(fileData.buffer);
    let versionBuffer = new Uint8Array(myDataView.buffer, 0, 4);
    const decoder = new TextDecoder();
    setInfos({
      "version": decoder.decode(versionBuffer),
      "length": myDataView.getInt32(4, true),
      "headerType" : myDataView.getInt32(8, true)
    });
  }, [fileData]);

  return (
    <div>
      <div>
        {
          Object.entries(infos).map(([key, value], i) => (
            <p key={i}>{`${key} : ${value}`}</p>
          ))
        }
      </div>
    </div>
  );
};

export default Tab1Component;