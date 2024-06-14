import React from 'react';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';

interface Props {
  subscribe: Function,
}

const HeaderLength: React.FC<Props> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>({ subscribe, "fieldName": "headerLength ", "dataType": u32() });

  return (
    <div>HeaderLength !!! <span>{getValue}</span></div>
  );
};

export default HeaderLength;