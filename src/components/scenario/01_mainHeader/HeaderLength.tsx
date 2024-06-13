import React from 'react';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';

interface Props {
  subscribe: Function,
}

const HeaderLength: React.FC<Props> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>(subscribe, "headerLength ", u32());

  return (
    <div>HeaderLength !!! <span>{getValue}</span></div>
  );
};

export default HeaderLength;