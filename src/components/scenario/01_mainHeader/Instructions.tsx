import { SubscribeFunction, useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { str, u32 } from '@root/core/factories/dataFactories';

import React from 'react';

interface Props {
  subscribe: SubscribeFunction;
}

const Instructions: React.FC<Props> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<string>({ subscribe, "fieldName": "instructions", "dataType": str(u32()) });


  return (
    <div>Instructions<span>{getValue}</span></div>
  );
};

export default Instructions;