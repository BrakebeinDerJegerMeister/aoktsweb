import { SubscribeFunction, useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { dataObject } from '@pages/ScenarioPage';
import { u32 } from '@root/core/factories/dataFactories';
import React, { RefObject, useState } from 'react';

interface Props {
  subscribe: SubscribeFunction;
}

const IndividualVictories: React.FC<Props> = ({ subscribe }) => {
  const [isUsed, setIsUsed] = useState<Boolean>(true);

  const beforeRead = function(data:RefObject<dataObject>) {
    if (data.current) {
      if (data.current.headerType) {
        let headerType = data.current.headerType.value as number;
        let use = headerType < 6;
        setIsUsed(use);
        return use;
      }
    }
  }
  
  const afterRead = function(_data:RefObject<dataObject>) {
  }

  const { getValue } = useHeaderSubscription<string>({ subscribe, "fieldName": "individualVictories", "dataType": u32(), beforeRead, afterRead });

return isUsed && (
    <div>IndividualVictories: <span>{getValue}</span></div>
  );
};

export default IndividualVictories;