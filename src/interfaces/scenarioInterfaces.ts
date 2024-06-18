import * as dT from "@dataTypes/index";


export type valueTypes = dT.U32 | dT.U16 | dT.F32 | dT.Ascii | dT.ArrayData | dT.Str | null;

export interface FieldConfig<valueTypes> {
  fieldName: string,
  type: any;
  value?: valueTypes;
  rawValue?: Uint8Array | null;
  read: Function;
  write: Function;
  create: Function;
}

export interface MainHeaderComponents {
  version: JSX.Element;
  headerLength: JSX.Element;
  headerType: JSX.Element;
  lastSaveTimestamp: JSX.Element;
  instructions: JSX.Element;
  individualVictories: JSX.Element;
  playerCount: JSX.Element;
  value1000: JSX.Element;
  gameEdition: JSX.Element;
  usedSetsCount: JSX.Element;
  usedSets: JSX.Element;
  creatorName: JSX.Element;
  triggerCount: JSX.Element;
  compressedData: JSX.Element;
}

export interface ScenarioComponents {
  uncompressedHeader: MainHeaderComponents;
}

