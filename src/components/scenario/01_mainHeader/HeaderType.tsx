import { u32 } from '@root/core/factories/dataFactories';
import React, { useEffect, useState } from 'react';

interface Props {
  subscribe: Function,
}

const HeaderType: React.FC<Props> = ({ subscribe }) => {

  const [getValue, setValue] = useState<number>();

  useEffect(() => {
    subscribe("headerType", u32(), getValue, setValue);
  }, [])

  return (
    <div>HeaderType... <span>{getValue}</span></div>
  );
};

export default HeaderType;