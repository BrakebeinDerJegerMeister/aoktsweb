// src/tabs/RawDataTab.tsx

import { Scenario } from '@root/pages/ScenarioPage';
import React from 'react';

interface Props {
  scenario?: Scenario,
}

const RawDataTab: React.FC<Props> = ({ scenario }) => {
  return (
    <>
      <p>Raw Data</p>
        {
          scenario && scenario.mainHeader && Object.entries(scenario.mainHeader).map(([_name, comp], i)=>{
            return <div key={i}>{comp}</div>
          })
        }     
    </>
  );
};

export default RawDataTab;