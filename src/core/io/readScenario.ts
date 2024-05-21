import { Scenario } from '../types/Scenario';
import { p_Scenario } from '../structs/p_Scenario';
import { SType } from '../types/SType';
import { Section } from '../types/Section';
import { ArrayOf } from '../types/ArrayOf';
import Pako from 'pako';

export function readScenario(myUint8Array: Uint8Array) {
    console.log("@@@ READ Scenario @@@")

    let currentRW: STypeRW = {} as STypeRW;
    let scenario = new Map();
    //let scenario = new Scenario();
    //let scenario = {};

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
                    let decompressedData: ArrayBufferLike | null = null;
                    try {
                        // Décompression des données avec l'option raw
                        //console.log(scenario["mainHeader"]["compressedData"]);
                        decompressedData = Pako.inflate(scenario.get("mainHeader").get("compressedData").getValue(), { raw: true });
                        if (decompressedData) {
                            currentRW = {
                                "index": 0,
                                "dataView": new DataView(decompressedData.buffer)
                            } as STypeRW;
                        }
                    } catch (err) {
                        console.error('Erreur lors de la décompression:', err);
                    }
                    break;
            }
        }

    }
    function processMe(me) {
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
    console.log("@@@ Scenario :", scenario)
    let floatNumber = scenario.get("scenarioHeader").get("version");
    let targetNumber = 1.26;
    let epsilon = Number.EPSILON; // Epsilon du système
    
    if (Math.abs(floatNumber - targetNumber) < epsilon) {
        console.log(floatNumber);
        console.log(epsilon);
        console.log("Le nombre est proche de 1.26");
    } else {
        console.log(floatNumber);
        console.log(epsilon);
        console.log(Number.EPSILON * Math.max(1, Math.abs(floatNumber), Math.abs(targetNumber)));
        console.log("Le nombre n'est pas proche de 1.26");
    }


    return scenario;
}