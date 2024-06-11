import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';
import React, { useEffect, useState } from 'react';

interface Props {
  subscribe: Function,
}

const HeaderLength: React.FC<Props> = ({ subscribe }) => {

  const {getValue, setValue} = useHeaderSubscription<string>(subscribe,  "headerLength ",  u32() );

  return (
    <div>HeaderLength !!! <span>{getValue}</span></div>
  );
};

export default HeaderLength;