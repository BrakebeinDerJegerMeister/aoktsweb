import React from 'react';

import { ascii } from '@root/core/factories/dataFactories';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';

interface Props {
  subscribe: Function,
}

const Version: React.FC<Props> = ({ subscribe }) => {

  const {getValue, setValue, getRawValue, setRawValue} = useHeaderSubscription<string>(subscribe,  "version",  ascii(4) );



  return (
    <div>Coucou je suis la version ! <span>{getValue} - {getRawValue}</span></div>
  );
};

export default Version;