// src/tabs/RawDataTab.tsx

import { Scenario } from '@root/pages/ScenarioPage';
import React from 'react';

interface Props {
  fields: any,
  scenario?: Scenario,
}

const RawDataTab: React.FC<Props> = ({ fields, scenario }) => {


  return (
    <>
      <p>Raw Data</p>
      {
        fields && Object.entries(fields).map(([_name, comp], i) => {
          console.log(comp.rawValue)
          return <div key={i}>{_name} - {comp.rawValue} - {
            comp.rawValue.map((val, j) => {
              return <span key={j}>{val.toString(16).padStart(2, '0').toUpperCase()}</span>
            })
          }
          </div>
          //return <div key={i}>{"aaa"}</div>;
        })
      }
    </>
  );
};

export default RawDataTab;