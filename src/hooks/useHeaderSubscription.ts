import { useState, useEffect, useRef } from 'react';

// interface UseHeaderSubscriptionProps {
//   subscribe: Function;
//   fieldName: string;
//   dataType: () => any; // Remplacez any par un type plus spécifique si possible
// }

export function useHeaderSubscription<T>(subscribe: Function, fieldName: string, dataType: () => any) {
  const [getValue, setValue] = useState<T>();
  const [getRawValue, setRawValue] = useState<Uint8Array>();
  const ref_value = useRef<T>();
  const ref_rawValue = useRef<Uint8Array>();

  useEffect(() => {
    //console.log(getValue);
    const callback_getValue:()=>T | undefined  = ()=> ref_value.current ;
    const callback_setValue = (newValue: T) => {
      ref_value.current = newValue;
      setValue(newValue);
    }
    const callback_getRawValue:()=>Uint8Array | undefined  = ()=> { 
      //console.log("Read raw value :", ref_rawValue.current);
     return ref_rawValue.current} ;
    const callback_setRawValue = (newRawValue: Uint8Array) => {
      //console.log("Save raw value :", newRawValue);
      ref_rawValue.current = newRawValue;
      setRawValue(newRawValue);
    }    
    
    subscribe(fieldName, dataType, callback_getValue, callback_setValue, callback_getRawValue, callback_setRawValue);
  }, []);

  return { getValue, setValue, getRawValue, setRawValue };
}
