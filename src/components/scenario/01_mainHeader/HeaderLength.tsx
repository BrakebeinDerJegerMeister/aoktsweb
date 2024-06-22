// src/components/scenario/01_mainHeader/Version.tsx

import React, { useEffect, useRef, useState } from 'react';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import UseCommComponent from '@hooks/UseCommComponent';


const HeaderLength: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {
  
  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const myHooks = {getValue2, setValue2, getRawValue2, setRawValue2}
  UseCommComponent( {mySubscriber, myName:"headerLength", myType:u32(), myHooks});

   return (
    <div>HeaderLength !!! <span>{getValue2}</span></div>
  );
};

export default HeaderLength;