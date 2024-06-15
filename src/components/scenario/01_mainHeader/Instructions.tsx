import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { ScnCompAttribute } from '@root/interfaces';
import { str, u32 } from '@utils/dataFactories';

import React from 'react';

const Instructions: React.FC<ScnCompAttribute> = ({ 
  subscribe 
}) => {

  const { getValue } = useHeaderSubscription<string>({ subscribe, "fieldName": "instructions", "dataClassType": str(u32()) });


  return (
    <div>Instructions<span>{getValue}</span></div>
  );
};

export default Instructions;