// src/tabs/RawDataTab.tsx

import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { FieldConfig, ScenarioComponents } from '@interfaces/scenarioInterfaces';

import React from 'react';

interface Props {
  fields: Record<string, FieldConfig<any>>;
  scenario?: ScenarioComponents,
}

const RawDataTab: React.FC<Props> = ({ fields/*, scenario*/ }) => {

  //console.log(fields)

  return (
    <>
      <p>Raw Data</p>

      <Flex wrap="wrap">
        {fields && Object.entries(fields).map(([_name, comp], _i: number) => {
          if (!comp.rawValue) return;
          const rawValue = Array.from(comp.rawValue) as Array<number>;
          return rawValue.length && (
            rawValue.map((val: number, j: number, a: Array<number>) => (
              <Tooltip label={_name} key={j} hasArrow>
                <Text
                  as="span"
                  fontFamily="monospace"
                  fontSize='x-large'
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