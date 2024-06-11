import { useState, useEffect } from 'react';

// interface UseHeaderSubscriptionProps {
//   subscribe: Function;
//   fieldName: string;
//   dataType: () => any; // Remplacez any par un type plus spécifique si possible
// }

export function useHeaderSubscription<T>(subscribe: Function, fieldName: string, dataType: () => any) {
  const [getValue, setValue] = useState<T>();
  const [getRawValue, setRawValue] = useState<Uint8Array>();

  useEffect(() => {
    subscribe(fieldName, dataType, getValue, setValue, getRawValue, setRawValue);
  }, []);

  return { getValue, setValue, getRawValue, setRawValue };
}
