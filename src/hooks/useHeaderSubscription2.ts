// src/hooks/useHeaderSubscription.ts

import { useEffect, useState } from 'react';




export function useHeaderSubscription2(subscriber, name) {

  const [getValue2, setValue2] = useState<any>({ value: null });
  const [getRawValue2, setRawValue2] = useState<any>({ value: null });

  const [beforeReadHook, setBeforeReadHook] = useState();
  const [afterReadHook, setAfterReadHook] = useState();
  const [beforeWriteHook, setBeforeWriteHook] = useState();
  const [afterWriteHook, setAfterWriteHook] = useState();
  const [beforeCreateHook, setBeforeCreateHook] = useState();
  const [afterCreateHook, setAfterCreateHook] = useState();


  /*function internalRead(myReader: STypeRW, obj: FieldConfig<valueTypes>, data: RefObject<GameData>) {
    let ret = dataClassType().read(myReader);
    obj.value = ret.typedValue;
    obj.rawValue = ret.rawValue;

    if (data.current) {
      const fieldData = data.current[obj.fieldName];
      if (fieldData) {
        fieldData.value = ret.typedValue;
      } else {
        throw new Error("@@@ e2");
      }
    } else {
      throw new Error("@@@ e1");
    }


    //console.log(obj.fieldName, ret.typedValue);
    setValue(ret.typedValue);
    setRawValue(ret.rawValue);
  }

  */
  function read() {
    /*(!beforeRead || beforeRead(data)) && internalRead(myReader,obj, data);
    if (afterRead) { afterRead(data); }*/
  }

  function write() {

  }

  function create() {

  }

  useEffect(() => {
    let copy = { ...subscriber };
    copy[name] = {
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
    subscriber(copy);
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
