
import { p_Scenario } from '../structs/p_Scenario';
import { Section } from '../types/Section';
import { ArrayOf } from '../types/ArrayOf';
import Pako from 'pako';
import { getRoundedVersion } from '../utils/getRoundedVersion';

export function readScenario(myUint8Array: Uint8Array, myData: any) {
    console.log("@@@ READ Scenario @@@")

    let currentRW: STypeRW = {} as STypeRW;
    let scenario = new Map();
    //let scenario = new Scenario();
    //let scenario = {};

    p_Scenario(scenario, myData);



    function processEntry(me: any, key: string, obj: any) {

        switch (key) {

            case "readFloatVersion":
                //console.log(currentRW)
                obj.version2 = getRoundedVersion(currentRW.dataView.getFloat32(4, true));
                break;

            case "useMainDataView":
                currentRW = {
                    "name": "mainDataView",
                    "index": 0,
                    "dataView": new DataView(myUint8Array.buffer)
                } as STypeRW;
                obj.mainRW = currentRW;
                break;

            case "useScenarioDataView":;
                let decompressedData: ArrayBufferLike | null = null;
                try {
                    decompressedData = Pako.inflate(scenario.get("mainHeader").get("compressedData").getValue(), { raw: true });
                    if (decompressedData) {
                        currentRW = {
                            "name": "scenarioDataView", 
                            "index": 0,
                            "dataView": new DataView(decompressedData.buffer)
                        } as STypeRW;
                        obj.scenarioRW = currentRW
                    }
                } catch (err) {
                    console.error('Erreur lors de la décompression:', err);
                }
                break;

            default:

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
    }

    function processMe(me: any) {
        // console.log("@ processMe : ", me.constructor)
        // console.log("@ processMe : ", me instanceof Map)
        // console.log("@ processMe : ", me)

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

    processMe(scenario);
    //console.log(scenario["mainHeader"]["compressedData"]);



    return scenario;
}