
import Pako from 'pako';
import { getRoundedVersion } from '../../utils/getRoundedVersion';
import { FileData } from '@hooks/useFileHandler';
import { ExtensionError } from '@errors/extensionError';
import { InflateError } from '@errors/inflateError';
import { ScenarioVersionError } from '@errors/scenarioVersionError';
import { GameData } from './GameData';


export interface UncompressedHeader {
    version: string,
    headerLength: number,
    headerType: number,
    lastSaveTimestamp: number,
    instructions: string,
    individualVictories?: number,
    playerCount?: number,
    value1000?: number,
    gameEdition?: number,
    usedSetsCount?: number,
    usedSets?: Array<number>,
    creatorName?: string,
    triggerCount?: number,
    compressedData?: Uint8Array,
}

export function fastReadScenario(fileData: FileData, myData: GameData) {
    let currentIndex = 0;
    const myMainUint8Array = fileData.arrayBuffer;
    const headerDataView = new DataView(myMainUint8Array.buffer);

    function get_u32(): number {
        const value = headerDataView.getUint32(currentIndex, true);
        currentIndex += 4;
        return value;

    }
    function get_string(len: number): string {
        let buffer = new Uint8Array(myMainUint8Array.buffer, currentIndex, len);
        currentIndex += len;
        const decoder = new TextDecoder();
        const value = decoder.decode(buffer);
        return value
    }

    let fileName: string = fileData.fileName;
    let spFileName = fileName.split(".");
    let extension: string = fileName.includes(".") ? spFileName.pop() ?? "" : "";
    let baseName = spFileName.join(".");

    //=========================================================

    const uncompressedHeader: Partial<UncompressedHeader> = {};


    uncompressedHeader.version = ""+get_string(4);
    uncompressedHeader.headerLength = get_u32();
    uncompressedHeader.headerType = get_u32();
    uncompressedHeader.lastSaveTimestamp = get_u32();
    const instructions_length = get_u32();
    uncompressedHeader.instructions = get_string(instructions_length);
    if (uncompressedHeader.headerType < 6) {
        uncompressedHeader.individualVictories = get_u32();
    }
    uncompressedHeader.playerCount = get_u32();
    if (uncompressedHeader.headerType > 2) {
        uncompressedHeader.value1000 = get_u32();
        uncompressedHeader.gameEdition = get_u32();
        uncompressedHeader.usedSetsCount = get_u32();
        console.log(uncompressedHeader.usedSetsCount);
        uncompressedHeader.usedSets = [];
        for (let i=0; i<uncompressedHeader.usedSetsCount; i++) {
            const value = get_u32();
            uncompressedHeader.usedSets.push(value);
        }
    }
    if (uncompressedHeader.headerType > 4) {
        const creatorName_length = get_u32();
        uncompressedHeader.creatorName = get_string(creatorName_length);
        uncompressedHeader.triggerCount = get_u32();
    }
    let compressedData = new Uint8Array(headerDataView.buffer, currentIndex, undefined);
    try {
        uncompressedHeader.compressedData = compressedData;

        const inflatedData = Pako.inflate(compressedData, { raw: true });
        let scenarioDataView = new DataView(inflatedData.buffer);
        const longVersion2 = scenarioDataView.getFloat32(4, true);
        const version2: number = getRoundedVersion(longVersion2);
        myData.longVersion2 = longVersion2;
        myData.version2 = version2;
        if (!((version2 >= 1) && (version2 <= 1.6))) {
            throw new ScenarioVersionError();
        }
        myData.inflatedData = inflatedData;

    }
    catch {
        throw new InflateError();
    }

    myData.fileName = fileName;
    myData.fileExtension = extension;
    myData.arrayBuffer = fileData.arrayBuffer;
    myData.fileSize = fileData.fileSize;
    myData.baseName = baseName;
    myData.uncompressedHeader = uncompressedHeader;

    const knownExtensions = ["scn", "scx", "scx2", "aoe2scenario"];
    if (!knownExtensions.includes(extension)) {
        throw new ExtensionError();
    }

    return uncompressedHeader;
}