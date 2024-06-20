// src/components/scenario/01_mainHeader/Version.tsx

import React, { useEffect, useRef, useState } from 'react';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import UseCommComponent from '@hooks/UseCommComponent';


const HeaderLength: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {

  
  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const myHooks = {getValue2, setValue2, getRawValue2, setRawValue2}
  UseCommComponent( mySubscriber, "headerLength", u32(), myHooks);

  
  /*const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const value = useRef<any>();
  const rawValue = useRef<any>();

  const type = useRef<any>(u32());

  const read = function (myReader: any) {
    let ret = type.current().read(myReader);

    value.current = ret.typedValue;
    rawValue.current = ret.rawValue;

    setValue2(ret.typedValue);
    setRawValue2(ret.rawValue);
  }

  useEffect(() => {
    mySubscriber.current["headerLength"] = {
      name: "headerLength",
      hooks: { getValue2, setValue2, getRawValue2, setRawValue2, value, rawValue },
      read: read,
    };

    // Fonction appelée au démontage du composant !!!!!!
    return () => {
      delete mySubscriber.current["version"];
    };
  }, [getValue2, setValue2, getRawValue2, setRawValue2]);*/

  return (
    <div>HeaderLength !!! <span>{getValue2}</span></div>
  );
};

export default HeaderLength;