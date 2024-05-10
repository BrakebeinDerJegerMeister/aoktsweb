// Tab1Component.tsx
import React from 'react';

interface Props {
  fileData: Uint8Array | null;
}

const Tab1Component: React.FC<Props> = ({fileData}) => {
  return (
    <><p>{fileData?.byteLength}</p></>
  );
};

export default Tab1Component;