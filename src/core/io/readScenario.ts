
import { p_Scenario } from '../structs/p_Scenario';
import { Section } from '../types/Section';
import { ArrayOf } from '../types/ArrayOf';
import Pako from 'pako';

export function readScenario(myUint8Array: Uint8Array, myData) {
    console.log("@@@ READ Scenario @@@")

    let currentRW: STypeRW = {} as STypeRW;
    let scenario = new Map();
    //let scenario = new Scenario();
    //let scenario = {};

    p_Scenario(scenario, myData);



    function processEntry(me, key: string, obj: any) {

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


    function roundFloat(value, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(value * factor) / factor;
    }
    
    function isCloseEnough(a, b, epsilon = Number.EPSILON) {
        return Math.abs(a - b) < epsilon;
    }
    
    function discoverSignificantDigits(value, maxPrecision = 16, epsilon = Number.EPSILON) {
        let previousRoundedValue = roundFloat(value, 0);
        for (let precision = 1; precision <= maxPrecision; precision++) {
            const roundedValue = roundFloat(value, precision);
            if (isCloseEnough(roundedValue, previousRoundedValue, epsilon)) {
                return precision;
            }
            previousRoundedValue = roundedValue;
        }
        return maxPrecision;
    }
    
    function discoverVersion(value, epsilon = Number.EPSILON) {
        const significantDigits = discoverSignificantDigits(value, 10, epsilon);
        const roundedValue = roundFloat(value, significantDigits);
        return roundedValue.toFixed(significantDigits);
    }
    
    // La valeur float à analyser
    const value = scenario.get("scenarioHeader").get("version").value;
    
    // Découvrir le nombre de chiffres significatifs
    const significantDigits = discoverSignificantDigits(value);
    console.log("Nombre de chiffres significatifs :", significantDigits);
    
    // Découvrir la version probable
    const discoveredVersion = discoverVersion(value);
    console.log("La version découverte est :", discoveredVersion);
    console.log(discoveredVersion);

    return scenario;
}