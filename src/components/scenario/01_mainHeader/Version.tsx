import React from 'react';

import { ascii } from '@utils/dataFactories';
import { useHeaderSubscription } from '@hooks/useHeaderSubscription';
import { ScnCompAttribute } from '@root/interfaces';

const Version: React.FC<ScnCompAttribute> = ({ subscribe }) => {

  const { getValue } = useHeaderSubscription<string>({ subscribe, "fieldName": "version", "dataClassType": ascii(4) });


  return (
    <div>Coucou je suis la version ! <span>{getValue}</span></div>
  );
};

export default Version;