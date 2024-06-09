import { u32 } from '@root/core/factories/dataFactories';
import React, { useEffect, useState } from 'react';

interface Props {
  subscribe: Function
}

const HeaderLength: React.FC<Props> = ({ subscribe }) => {

  const [getValue, setValue] = useState<number>();

  useEffect(() => {
    subscribe("headerLength", u32(), getValue, setValue);
  }, [])

  return (
    <div>HeaderLength !!! <span>{getValue}</span></div>
  );
};

export default HeaderLength;