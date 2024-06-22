// src/components/scenario/01_mainHeader/IndividualVictories.tsx

import UseCommComponent from '@hooks/UseCommComponent';
import { ScnCompAttribute } from '@root/interfaces';
import { u32 } from '@utils/dataFactories';
import React, { useCallback, useState } from 'react';


const IndividualVictories: React.FC<ScnCompAttribute> = ({ mySubscriber }) => {
  const [isUsed, setIsUsed] = useState<Boolean>(true);
  const [getValue2, setValue2] = useState<any>();
  const [getRawValue2, setRawValue2] = useState<any>();

  const beforeRead = useCallback(() => {
    console.log(mySubscriber.current);
    if (mySubscriber.current) {
      if (mySubscriber.current["headerType"]) {
        let headerType = mySubscriber.current["headerType"].hooks.value.current as number;
        let use = headerType < 6;
        console.log(mySubscriber.current["headerType"]);
        console.log("OK HEADER TYPE", headerType);
        setIsUsed(use);
        return use;
      }
    }
  }, []);  // Les dépendances sont vides car mySubscriber.current est mutable
  
  
  const afterRead = useCallback((_mySubscriber_ : any) => {
  },[]);


  const myHooks = {getValue2, setValue2, getRawValue2, setRawValue2}
  const myCallbacks = {beforeRead, afterRead}

  UseCommComponent( {mySubscriber, myName: "individualVictories", myType: u32(), myHooks, myCallbacks} );

return isUsed && (
    <div>IndividualVictories: <span>{getValue2}</span></div>
  );
};

export default IndividualVictories;