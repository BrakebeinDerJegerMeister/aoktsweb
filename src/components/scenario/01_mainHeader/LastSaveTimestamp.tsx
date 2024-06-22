import { FormattedDate } from '@components/FormattedDate';
import UseCommComponent from '@hooks/UseCommComponent';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import React, { useState } from 'react';



const LastSaveTimestamp: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {

  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const myHooks = { getValue2, setValue2, getRawValue2, setRawValue2 }
  UseCommComponent({mySubscriber, myName:"lastSaveTimestamp", myType:u32(), myHooks});



  return (
    <span>lastSaveTimestamp : {getValue2 && <FormattedDate timestamp={getValue2 * 1000} />}</span>
  );
};

export default LastSaveTimestamp;