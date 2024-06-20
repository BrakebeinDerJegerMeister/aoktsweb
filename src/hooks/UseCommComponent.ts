// src/hooks/UseCommComponent.ts


import React, { useEffect, useRef } from 'react';


const UseCommComponent: React.FC<any> = (mySubscriber: any, myName: any, myType: any, myHooks: any) => {

  const { getValue2, setValue2, getRawValue2, setRawValue2 } = myHooks;
  const value = useRef<any>();
  const rawValue = useRef<any>();



  const read = function (myReader: any) {
    let ret = myType().read(myReader);

    value.current = ret.typedValue;
    rawValue.current = ret.rawValue;

    setValue2(ret.typedValue);
    setRawValue2(ret.rawValue);
  }

  useEffect(() => {
    mySubscriber.current[myName] = {
      name: myName,
      hooks: { getValue2, setValue2, getRawValue2, setRawValue2, value, rawValue },
      read: read,
    };

    // Fonction appelée au démontage du composant !!!!!!
    return () => {
      delete mySubscriber.current["version"];
    };
  }, [getValue2, setValue2, getRawValue2, setRawValue2]);

};

export default UseCommComponent;