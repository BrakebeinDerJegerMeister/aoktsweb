import React, { useEffect, useState } from 'react';

import { ascii } from '@root/core/factories/dataFactories';

interface Props {
  subscribe: Function,
}

const Version: React.FC<Props> = ({ subscribe }) => {

  const [getValue, setValue] = useState<string>();

  useEffect(() => {
    subscribe("version", ascii(4), getValue, setValue);
  }, [])

  return (
    <div>Coucou je suis la version ! <span>{getValue}</span></div>
  );
};

export default Version;