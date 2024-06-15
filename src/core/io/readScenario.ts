
import { p_Scenario } from '../structs/p_Scenario';
import { Section } from '../../dataTypes/Section';

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
import { SType } from '../../dataTypes/SType';




export function fastReadScenario(fileData: FileData, myData: GameData) {

    let fileName: string = fileData.fileName;
    let spFileName = fileName.split(".");
    let extension: string = fileName.includes(".") ? spFileName.pop() ?? "" : "";
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
    let myHeaderObj = {}

    myData.version = version;
    myData.headerType = headerType;
    p_MainHeader(myHeader, myData);
    let headerRW = {
        "name": "mainDataView",
        "index": 0,
        "dataView": headerDataView
    } as STypeRW;

    doReadProcess(myHeader, headerRW, myHeaderObj);

    let compressedData = myHeader.get('compressedData').getValue();
    let inflatedData;
    try {
        inflatedData = Pako.inflate(compressedData, { raw: true });
        //console.log(inflatedData);
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
    //console.log(myHeaderObj);
    return myHeader;
}


export function readScenario(_fileData: FileData, myData: GameData) {
    let myScenario = new Map();
    let myScenarioObj = {};
    let scenarioRW = {
        "name": "mainDataView",
        "index": 0,
        "dataView": myData.scenarioDataView
    } as STypeRW;
    p_Scenario(myScenario, myData);
    doReadProcess(myScenario, scenarioRW, myScenarioObj);

    myData.scenario = myScenario;
    //console.log(myScenarioObj);
    return myScenario;
}


function doReadProcess(me: Map<string, any>, currentRW: STypeRW, simpleObj: any) {
    
    function processEntry(_me: any, key: string, obj: any, simpleObj: any) {
        if (obj instanceof Function) {
            let myObj = obj();
            if (myObj instanceof Section) {
                myObj.createSection();
                processMe(myObj.getValue(), simpleObj);
            } else {
                myObj.readData(currentRW, key, processEntry)
            }
            return myObj;
        }
    }
    
    function processArray(simpleObj:any, key: string, ret: SType<Array<any>>) {
        simpleObj[key] = [];
        for (let e_val of ret.getValue()) {
            simpleObj[key].push(e_val.getValue());
        }
    }
    
    function processMap(simpleObj:any, key: string, ret: SType<Map<string, any>>) {
        simpleObj[key] = {};
        for (let [e_key, e_val] of ret.getValue().entries()) {
            simpleObj[key][e_key] = e_val.getValue();
        }
    }

    function processMe(me: any, simpleObj: any) {
        if (me instanceof Map) {
            for (let [key, obj] of me) {
                let ret = processEntry(me, key, obj, simpleObj);
                if (ret.getValue() instanceof Map) {
                    processMap(simpleObj, key, ret);
                } else if (ret.getValue() instanceof Array) {
                    processArray(simpleObj, key, ret);
                } else {
                    simpleObj[key] = ret.getValue();
                }
                me.set(key, ret);
            }
        }
    }

    processMe(me, simpleObj);

}
