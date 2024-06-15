import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import React from 'react';

const HeaderType: React.FC<ScnCompAttribute> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>({subscribe, "fieldName": "headerType", "dataClassType": u32()});

  return (
    <div>HeaderType... <span>{getValue}</span></div>
  );
};

export default HeaderType;