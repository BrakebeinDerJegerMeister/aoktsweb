// src/tabs/RawDataTab.tsx

import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FieldConfig/*, Scenario*/ } from '@root/pages/ScenarioPage';
import React from 'react';

interface Props {
  fields: FieldConfig,
  //scenario?: Scenario,
}


const RawDataTab: React.FC<Props> = ({ fields/*, scenario*/ }) => {




  return (
    <>
      <p>Raw Data</p>
      {
        fields && Object.entries(fields).map(([_name, comp], i) => {
          //console.log(comp.rawValue)
          const rawValue = Array.from(comp.rawValueGetter()) as Array<number>;;
          //console.log(comp.rawValueGetter())
          return rawValue.length && <div key={i}>{_name} - {rawValue.toString()} - {
            rawValue.map((val, j) => {
              return <span key={j}>{val.toString(16).padStart(2, '0').toUpperCase()}</span>
            })
          }
          </div>



          //return <div key={i}>{"aaa"}</div>;
        })
      }

      <Flex wrap="wrap">
        {fields && Object.entries(fields).map(([_name, comp], _i: number) => {
          const rawValue = Array.from(comp.rawValueGetter()) as Array<number>;
          //comp.rawValue.map((val : number, j: number, a: Array<number>) =>
          return rawValue.length && (
            rawValue.map((val: number, j: number, a: Array<number>) => (
              <Tooltip label={_name} key={j} hasArrow>
                <Text
                  as="span"
                  fontFamily="monospace"
                  //marginRight={2}
                  fontSize='x-large'
                  //marginBottom={2}
                  padding={1}
                  borderLeft={j == 0 ? "red solid 0.15em" : "none"}
                  borderRight={j == (a.length - 1) ? "red solid 0.15em" : "none"}
                  borderTop="red solid 0.15em"
                  borderBottom="red solid 0.15em"
                  backgroundColor="lightgrey"
                  key={j}
                >
                  {val.toString(16).padStart(2, '0').toUpperCase()}
                </Text>
              </Tooltip>
            ))
          )
        })}
      </Flex>
    </>
  );
};

export default RawDataTab;