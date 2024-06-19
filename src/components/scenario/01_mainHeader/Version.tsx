import React, { useEffect, useRef, useState } from 'react';


import { ScnCompAttribute } from '@root/interfaces';
import { ascii } from '@utils/dataFactories';


const Version: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {

 
  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const value = useRef<any>();
  const rawValue = useRef<any>();

  const type = useRef<any>(ascii(4));

  const read = function(myReader:any) {
    let ret = type.current().read(myReader);

    value.current = ret.typedValue;
    rawValue.current = ret.rawValue;

    console.log(ret.typedValue)
    setValue2(ret.typedValue);
    setRawValue2(ret.rawValue);
  }

  useEffect(() => {
    mySubscriber.current["version"] = {
      name: "version",
      //type: type.current,
      hooks: { getValue2, setValue2, getRawValue2, setRawValue2, value, rawValue },
      read: read,
    };

    // Fonction appelée au démontage du composant !!!!!!
    return () => {
      delete mySubscriber.current["version"];
    };
  }, [getValue2, setValue2, getRawValue2, setRawValue2]);


  return (
    <div>Coucou je suis la version ! <span>{getValue2}</span></div>
  );
};

export default Version;