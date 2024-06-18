import React, { useEffect } from 'react';

import { ascii } from '@utils/dataFactories';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { ScnCompAttribute } from '@root/interfaces';


const Version: React.FC<ScnCompAttribute> = ({ subscribe, subscribe2 }) => {

  const { getValue } = useHeaderSubscription<string>({ subscribe, "fieldName": "version", "dataClassType": ascii(4) });
  const { getValue2, setValue2, getRawValue2, setRawValue2 } = subscribe2;

  useEffect(()=>{
    console.log(getValue2);
    console.log(setValue2);
    console.log(getRawValue2);
    console.log(setRawValue2);
  },[]);

  return (
    <div>Coucou je suis la version ! <span>{getValue}</span></div>
  );
};

export default Version;