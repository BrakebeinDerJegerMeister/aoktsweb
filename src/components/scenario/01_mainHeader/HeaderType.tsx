import { SubscribeFunction, useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';
import React from 'react';

interface Props {
  subscribe: SubscribeFunction;
}

const HeaderType: React.FC<Props> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>({subscribe, "fieldName": "headerType", "dataType": u32()});

  return (
    <div>HeaderType... <span>{getValue}</span></div>
  );
};

export default HeaderType;