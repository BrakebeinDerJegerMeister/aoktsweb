import React from 'react';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@utils/dataFactories';
import { ScnCompAttribute } from '@root/interfaces';

const HeaderLength: React.FC<ScnCompAttribute> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>({ subscribe, "fieldName": "headerLength ", "dataClassType": u32() });

  return (
    <div>HeaderLength !!! <span>{getValue}</span></div>
  );
};

export default HeaderLength;