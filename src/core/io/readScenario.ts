
import { p_Scenario } from '../structs/p_Scenario';
import { Section } from '../types/Section';
import { ArrayOf } from '../types/ArrayOf';
import Pako from 'pako';

import { getRoundedVersion } from '../utils/getRoundedVersion';
import { FileData } from '@hooks/useFileHandler';
import { MainHeaderMap, p_MainHeader } from '../structs/p_MainHeader';

import { ExtensionError } from '@errors/extensionError';
import { HeaderVersionError } from '@errors/headerVersionError';
import { HeaderTypeError } from '@errors/headerTypeError';
import { InflateError } from '@errors/inflateError';
import { ScenarioVersionError } from '@errors/scenarioVersionError';
import { GameData } from './GameData';




export function fastReadScenario(fileData: FileData, myData: GameData) {

    let fileName: string = fileData.fileName;
    let spFileName = fileName.split(".");
    let extension: string = fileName.includes(".") ? spFileName.pop() || "" : "";
    let baseName = spFileName.join(".");

    myData.fileName = fileName;
    myData.fileExtension = extension;
    myData.baseName = baseName;

    const knownExtensions = ["scn", "scx", "scx2", "aoe2scenario"];
    if (!knownExtensions.includes(extension)) {
        throw new ExtensionError();
    }

    let myMainUint8Array = fileData.arrayBuffer;
    let headerDataView = new DataView(myMainUint8Array.buffer);

    let versionBuffer = new Uint8Array(myMainUint8Array.buffer, 0, 4);
    const decoder = new TextDecoder();

    let version = Number(decoder.decode(versionBuffer));
    if (!((version >= 1) && (version <= 1.53))) {
        throw new HeaderVersionError();
    }

    let headerType = Number(headerDataView.getUint32(8, true));
    if (!((headerType >= 2) && (headerType <= 6))) {
        throw new HeaderTypeError();
    }

    let myHeader: MainHeaderMap = new Map();
    myData.version = version;
    myData.headerType = headerType;
    p_MainHeader(myHeader, myData);
    let headerRW = {
        "name": "mainDataView",
        "index": 0,
        "dataView": headerDataView
    } as STypeRW;

    doReadProcess(myHeader, headerRW);

    let compressedData = myHeader.get('compressedData').getValue();
    let inflatedData;
    try {
        inflatedData = Pako.inflate(compressedData, { raw: true });
        console.log(inflatedData);
    }
    catch {
        throw new InflateError();
    }
    let scenarioDataView = new DataView(inflatedData.buffer);
    let version2: number = getRoundedVersion(scenarioDataView.getFloat32(4, true));
    if (!((version2 >= 1) && (version2 <= 1.6))) {
        throw new ScenarioVersionError();
    }
    myData.inflatedData = inflatedData;
    myData.version2 = version2;
    myData.header = myHeader;
    myData.scenarioDataView = scenarioDataView;
    myData.headerDataView = headerDataView;
    return myHeader;
}


export function readScenario(_fileData: FileData, myData: GameData) {
    let myScenario = new Map();
    let scenarioRW = {
        "name": "mainDataView",
        "index": 0,
        "dataView": myData.scenarioDataView
    } as STypeRW;
    p_Scenario(myScenario, myData);
    doReadProcess(myScenario, scenarioRW);

    myData.scenario = myScenario;
    return myScenario;
}

function doReadProcess(me: Map<string, any>, currentRW: STypeRW) {

    function processEntry(_me: any, key: string, obj: any) {
        if (obj instanceof Function) {
            let myObj = obj();
            switch (true) {

                case myObj instanceof ArrayOf:
                    myObj.readData(currentRW, key, processEntry);
                    break;

                case myObj instanceof Section:
                    console.log("@@@ Section @@@");
                    myObj.createSection();
                    processMe(myObj.getValue());
                    break;

                default:
                    myObj.readData(currentRW, key)
            }
            return myObj;
        }
    }

    function processMe(me: any) {
        if (me instanceof Map) {
            for (let [key, obj] of me) {
                let ret = processEntry(me, key, obj);
                me.set(key, ret);
            }
        } else {
            Object.entries(me).forEach((entry) => {
                let [key, obj] = entry;
                console.log(key, obj)
                let ret = processEntry(me, key, obj);
                me[key] = ret;
            });
        }
    }

    processMe(me);

}
