// src/hooks/useHeaderSubscription.ts

import { FieldConfig, valueTypes } from '@interfaces/scenarioInterfaces';
import { GameData } from '@root/core/io/GameData';
import { useState, useEffect, RefObject } from 'react';

export type SubscribeFunction = (config: FieldConfig<valueTypes>) => void;

interface UseHeaderSubscriptionProps {
  subscribe: SubscribeFunction;
  fieldName: string;
  dataClassType: () => any;
  beforeRead?: Function;
  afterRead?: Function;
  beforeWrite?: Function;
  afterWrite?: Function;
}


export function useHeaderSubscription<T>({ subscribe, fieldName, dataClassType, beforeRead, afterRead }: UseHeaderSubscriptionProps) {

  const [getValue, setValue] = useState<T>();
  const [getRawValue, setRawValue] = useState<Uint8Array>(new Uint8Array());

  function internalRead(myReader: STypeRW, obj: FieldConfig<valueTypes>, data: RefObject<GameData>) {
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

  function read(myReader: STypeRW, obj: FieldConfig<any>, data: RefObject<GameData>) {
    (!beforeRead || beforeRead(data)) && internalRead(myReader,obj, data);
    if (afterRead) { afterRead(data); }
  }

  function write() {

  }

  function create() {

  }

  useEffect(() => {

    subscribe({ fieldName, "type": dataClassType, read, write, create });

  }, []);

  return { getValue, setValue, getRawValue, setRawValue };
}
