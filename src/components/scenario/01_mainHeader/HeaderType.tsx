import UseCommComponent from '@hooks/UseCommComponent';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import React, { useState } from 'react';

const HeaderType: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {

  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const myHooks = {getValue2, setValue2, getRawValue2, setRawValue2}
  UseCommComponent( {mySubscriber, myName:"headerType", myType:u32(), myHooks});

  return (
    <div>HeaderType... <span>{getValue2}</span></div>
  );
};

export default HeaderType;