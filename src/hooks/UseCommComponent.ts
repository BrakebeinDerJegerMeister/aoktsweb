// src/hooks/UseCommComponent.ts


import React, { useEffect, useRef } from 'react';

export interface UseCommComponentProps {
  mySubscriber: any;
  myName: string;
  myType: any;
  myHooks: {
    getValue2: () => any;
    setValue2: (value: any) => void;
    getRawValue2: () => any;
    setRawValue2: (value: any) => void;
  };
  myCallbacks?: {
    beforeRead?: (mySubscriber_: any) => boolean | undefined;
    afterRead?: (_data: any) => void;
  };
}


const UseCommComponent: React.FC<UseCommComponentProps> = ({ mySubscriber, myName, myType, myHooks, myCallbacks = {} }) => {

  const { getValue2, setValue2, getRawValue2, setRawValue2 } = myHooks;

  const beforeRead = myCallbacks.beforeRead;
  const afterRead = myCallbacks.afterRead;

  const value = useRef<any>();
  const rawValue = useRef<any>();



  const read = function (myReader: any) {

    let ret_br = (beforeRead && beforeRead(mySubscriber)) ?? true;

    if (ret_br) {
      let ret = myType().read(myReader);

      value.current = ret.typedValue;
      rawValue.current = ret.rawValue;

      setValue2(ret.typedValue);
      setRawValue2(ret.rawValue);

    }
    let ret_ar = afterRead && afterRead(mySubscriber);
  }

  useEffect(() => {
    mySubscriber[myName] = {
      name: myName,
      hooks: { getValue2, setValue2, getRawValue2, setRawValue2, value, rawValue },
      read: read,
    };

    // Fonction appelée au démontage du composant !!!!!!
    return () => {
      //delete mySubscriber.current["version"];
    };
  }, [getValue2, setValue2, getRawValue2, setRawValue2]);

  return null;

};

export default UseCommComponent;