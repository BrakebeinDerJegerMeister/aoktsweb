//src/tabs/Tab2Component.tsx

import { Scenario } from '@pages/ScenarioPage';
import React from 'react';

interface Props {
  scenario?: Scenario,
}

const Tab2Component: React.FC<Props> = ({ scenario }) => {
  return (
    <>
      <p>Tab2</p>
        {
          scenario && scenario.mainHeader && Object.entries(scenario.mainHeader).map(([_name, comp], i)=>{
            //console.log(comp)
            return <div key={i}>{comp}</div>
          })
        }     
    </>
  );
};

export default Tab2Component;