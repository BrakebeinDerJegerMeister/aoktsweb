import { UncompressedHeader } from "./readScenario";

export interface GameData {
    uncompressedHeader: Partial<UncompressedHeader>,
    header?: Map<string, any>,
    scenario?: Map<string, any>,
    arrayBuffer?: Uint8Array,
    fileSize?: number,
    version2?: number,
    longVersion2: number,
    scenarioDataView?: DataView,
    headerDataView?: DataView,
    fileName?: string,
    fileExtension?: string,
    baseName?: string,
    version?: number,
    headerType?: number,
    inflatedData?:Uint8Array,
}