import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { u32 } from '@root/core/factories/dataFactories';
import React from 'react';

interface Props {
  subscribe: Function,
}

const IndividualVictories: React.FC<Props> = ({ subscribe }) => {

  const beforeRead = function(_data:Object) {
    return true;
  }
  
  const afterRead = function(data:Object) {
    console.log(data);
  }

  const { getValue } = useHeaderSubscription<string>({ subscribe, "fieldName": "individualVictories", "dataType": u32(), beforeRead, afterRead });

  return (
    <div>IndividualVictories: <span>{getValue}</span></div>
  );
};

export default IndividualVictories;