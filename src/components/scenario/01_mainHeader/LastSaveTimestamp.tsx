import { FormattedDate } from '@components/FormattedDate';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';
import React, { useEffect, useState } from 'react';

interface Props {
  subscribe: Function
}

const LastSaveTimestamp: React.FC<Props> = ({ subscribe }) => {

  const {getValue, setValue} = useHeaderSubscription<string>(subscribe,  "lastSaveTimestamp",  u32() );

  return (
    <span>lastSaveTimestamp : {getValue && <FormattedDate timestamp={ getValue * 1000} />}</span>
  );
};

export default LastSaveTimestamp;