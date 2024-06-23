import { Box } from '@chakra-ui/react';
import UseCommComponent from '@hooks/UseCommComponent';
import { ScnCompAttribute } from '@root/interfaces';
import { str, u32 } from '@utils/dataFactories';

import React, { useState } from 'react';

const Instructions: React.FC<ScnCompAttribute> = ({   mySubscriber }) => {

  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const myHooks = { getValue2, setValue2, getRawValue2, setRawValue2 }
  UseCommComponent({mySubscriber, myName:"instructions", myType:str(u32()), myHooks});


  const normalizedText = (getValue2 && getValue2.replace(/\r\n/g, '\n')) ?? null;

  return (
    <div>Instructions<p>{normalizedText && normalizedText.split('\n').map((line: string, index: number) => {
      return <Box key={index}>{line}</Box>;
    })}</p></div>
  );
};

export default Instructions;