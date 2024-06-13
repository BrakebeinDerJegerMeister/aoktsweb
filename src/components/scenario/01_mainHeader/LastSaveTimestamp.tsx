import { FormattedDate } from '@components/FormattedDate';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';
import React from 'react';

interface Props {
  subscribe: Function
}

const LastSaveTimestamp: React.FC<Props> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<number>(subscribe, "lastSaveTimestamp", u32());

  return (
    <span>lastSaveTimestamp : {getValue && <FormattedDate timestamp={getValue * 1000} />}</span>
  );
};

export default LastSaveTimestamp;