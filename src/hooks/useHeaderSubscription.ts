import { FieldConfig } from '@root/pages/ScenarioPage';
import { useState, useEffect, useRef } from 'react';

type SubscribeFunction = (config: FieldConfig) => void;

interface UseHeaderSubscriptionProps {
  subscribe: SubscribeFunction;
  fieldName: string;
  dataType: () => any;
  beforeRead?: Function;
  afterRead?: Function;
  beforeWrite?: Function;
  afterWrite?: Function;
}

export function useHeaderSubscription<T>({ subscribe, fieldName, dataType, beforeRead, afterRead, beforeWrite, afterWrite }: UseHeaderSubscriptionProps) {

  const [getValue, setValue] = useState<T>();
  const [getRawValue, setRawValue] = useState<Uint8Array>(new Uint8Array());
  const ref_value = useRef<T>();
  const ref_rawValue = useRef<Uint8Array>(new Uint8Array());


  function internalRead(myReader: STypeRW, obj: FieldConfig, data: Object) {
    let ret = dataType().read(myReader);
    obj.value = ret.typedValue;
    obj.rawValue = ret.rawValue;
    data.current[obj.fieldName].value = ret.typedValue;
    console.log(obj.fieldName, ret.typedValue);
    setValue(ret.typedValue);
    setRawValue(ret.rawValue);
  }

  function read(myReader: STypeRW, obj: FieldConfig, data: Object) {
    (!beforeRead || beforeRead(data)) && internalRead(myReader,obj, data);
    if (afterRead) { afterRead(data); }
  }

  function write() {

  }

  function create() {

  }

  useEffect(() => {

    const callback_getValue: () => T | undefined = () => ref_value.current;
    const callback_setValue = (newValue: T) => {
      ref_value.current = newValue;
      setValue(newValue);
    }
    const callback_getRawValue: () => Uint8Array = () => {

      return ref_rawValue.current
    };
    const callback_setRawValue = (newRawValue: React.SetStateAction<Uint8Array>) => {

      ref_rawValue.current = newRawValue as Uint8Array;
      setRawValue(newRawValue);
    }

    subscribe({ fieldName, "type": dataType, "valueGetter": callback_getValue, "valueSetter": callback_setValue, "rawValueGetter": callback_getRawValue, "rawValueSetter": callback_setRawValue, read, write, create });

  }, []);

  return { getValue, setValue, getRawValue, setRawValue };
}
