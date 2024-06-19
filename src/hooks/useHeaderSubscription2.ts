// src/hooks/useHeaderSubscription.ts

import { useEffect, useRef, useState } from 'react';




export function useHeaderSubscription2(mySubscriber: any, name: string, dataClassType: Function) {

  const [getValue2, setValue2] = useState<any>();

  const [getRawValue2, setRawValue2] = useState<any>();

  const [getDataClassType, setDataClassType] = useState<string>(name);

  const [beforeReadHook, setBeforeReadHook] = useState();
  const [afterReadHook, setAfterReadHook] = useState();
  const [beforeWriteHook, setBeforeWriteHook] = useState();
  const [afterWriteHook, setAfterWriteHook] = useState();
  const [beforeCreateHook, setBeforeCreateHook] = useState();
  const [afterCreateHook, setAfterCreateHook] = useState();


  function internalRead(myReader: STypeRW, obj: any, data: any) {
    let ret = dataClassType().read(myReader);

    mySubscriber.current[name].value2 = ret.typedValue;
    mySubscriber.current[name].rawValue2 = ret.rawValue;

    setValue2(ret.typedValue);
    setRawValue2(ret.rawValue);
  }


  function read(myReader: STypeRW, obj: any, data: any) {
    //console.log(name, dataClassType);
    internalRead(myReader, obj, data);
    /*(!beforeRead || beforeRead(data)) && internalRead(myReader,obj, data);
    if (afterRead) { afterRead(data); }*/
  }

  function write() {

  }

  function create() {

  }

  useEffect(() => {
    //console.log("====> ",name, mySubscriber)
    if (name) {
      //let subscriberCopy = { ...mySubscriber };
      //subscriberCopy[name] = {
      mySubscriber.current[name] = {
        getValue2,
        setValue2,
        getRawValue2,
        setRawValue2,
        setBeforeReadHook,
        setAfterReadHook,
        setBeforeWriteHook,
        setAfterWriteHook,
        setBeforeCreateHook,
        setAfterCreateHook,
        read,
        write,
        create,
        name,
      };
      //setMySubscriber(subscriberCopy);
    }
  }, []);




  return {
    getValue2,
    setValue2,
    getRawValue2,
    setRawValue2,
    setBeforeReadHook,
    setAfterReadHook,
    setBeforeWriteHook,
    setAfterWriteHook,
    setBeforeCreateHook,
    setAfterCreateHook,
    read,
    write,
    create,
  };
}
