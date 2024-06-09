import { FormattedDate } from '@components/FormattedDate';
import { u32 } from '@root/core/factories/dataFactories';
import React, { useEffect, useState } from 'react';

interface Props {
  subscribe: Function
}

const LastSaveTimestamp: React.FC<Props> = ({ subscribe }) => {

  const [getValue, setValue] = useState<number>();

  useEffect(() => {
    subscribe("lastSaveTimestamp", u32(), getValue, setValue);
  }, [])

  return (
    <><span>{getValue && <FormattedDate timestamp={ getValue * 1000} />}</span></>
  );
};

export default LastSaveTimestamp;