import pako from 'pako';
import { Scenario } from '../types/Scenario';
import { p_Scenario } from '../structs/p_Scenario';
import { SType } from '../types/SType';
import { Section } from '../types/Section';
import { ArrayOf } from '../types/ArrayOf';

export function readScenario(myUint8Array: Uint8Array) {
    console.log("@@@ READ Scenario @@@")
    let currentRW: STypeRW = {} as STypeRW;

    let scenario = new Scenario();
    p_Scenario(scenario);



    function processEntry(me, key: string, obj: any) {
        console.log(obj);

        if (obj instanceof SType) {
            obj.readData(currentRW)
            return obj;
        } else if (obj instanceof Function) {
            let myObj = obj();
            switch (true) {
                case myObj instanceof ArrayOf:
                    // console.log(myObj.getCount());
                    myObj.readData(currentRW, processEntry);
                    //for (let i = 0; i < myObj.getCount(); i++) {
                    //    console.log("Houba");
                    //myObj.readData(currentRW)
                    //myObj.push()
                    //}
                    break;
                case myObj instanceof Section:
                    console.log("@@@ Section @@@");
                    myObj.createSection();
                    processMe(myObj.getValue());
                    break;
                default:
                    myObj.readData(currentRW)
            }
            return myObj;
        } else {
            switch (key) {
                case "useMainDataView":
                    currentRW = {
                        "index": 0,
                        "dataView": new DataView(myUint8Array.buffer)
                    } as STypeRW;
                    break;
                case "useScenarioDataView":
                    let decompressedData = null;
                    try {
                        // Décompression des données avec l'option raw
                        decompressedData = pako.inflate(scenario["mainHeader"]["compressedData"].getValue(), { raw: true });

                    } catch (err) {
                        console.error('Erreur lors de la décompression:', err);
                    }
                    if (decompressedData) {
                        currentRW = {
                            "index": 0,
                            "dataView": new DataView(decompressedData.buffer)
                        } as STypeRW;
                    }
                    break;
            }
        }

    }
    function processMe(me: IterableIterator<any>) {
        // console.log("@ processMe : ", me.constructor)
        // console.log("@ processMe : ", me instanceof Map)
        // console.log("@ processMe : ", me)
        if (me instanceof Map) {
            for (let [key, obj] of me) {
                let ret = processEntry(me, key, obj);
                me.set(key, ret);
            }
        }
    }

    processMe(scenario);
    //console.log(scenario["mainHeader"]["compressedData"]);
    console.log(scenario.scenarioHeader.version);

    return scenario;
}