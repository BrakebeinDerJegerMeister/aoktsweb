// src/components/scenario/01_mainHeader/Version.tsx

import React, { useState } from 'react';
import { ScnCompAttribute } from '@root/interfaces';
import { ascii } from '@utils/dataFactories';
import UseCommComponent from '@hooks/UseCommComponent';

const Version: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {

  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const myHooks = { getValue2, setValue2, getRawValue2, setRawValue2 }
  UseCommComponent({ mySubscriber, myName: "version", myType: ascii(4), myHooks });

  return (
    <>
      <div>Coucou je suis la version ! <span>{getValue2}</span></div>
      <div>Coucou je suis la version ! <span>{getRawValue2}</span></div>
    </>
  );
};

export default Version;