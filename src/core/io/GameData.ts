export interface GameData {
    header?: Map<string, any>;
    scenario?: Map<string, any>;
    fileType?: string;
    version2?: number;
    scenarioDataView?: DataView;
    headerDataView?: DataView;
    fileName?: string;
    fileExtension?: string;
    baseName?: string;
    version?: number;
    headerType?: number;
    inflatedData?:Uint8Array;
}