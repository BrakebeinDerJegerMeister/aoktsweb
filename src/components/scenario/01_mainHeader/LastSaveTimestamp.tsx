import { FormattedDate } from '@components/FormattedDate';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import React from 'react';



const LastSaveTimestamp: React.FC<ScnCompAttribute> = ({
  subscribe
}) => {

  const { getValue } = useHeaderSubscription<number>({ subscribe, "fieldName": "lastSaveTimestamp", "dataClassType": u32() });

  return (
    <span>lastSaveTimestamp : {getValue && <FormattedDate timestamp={getValue * 1000} />}</span>
  );
};

export default LastSaveTimestamp;