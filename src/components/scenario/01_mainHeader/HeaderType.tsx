import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';
import React from 'react';

interface Props {
  subscribe: Function,
}

const HeaderType: React.FC<Props> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>(subscribe, "headerType", u32());

  return (
    <div>HeaderType... <span>{getValue}</span></div>
  );
};

export default HeaderType;