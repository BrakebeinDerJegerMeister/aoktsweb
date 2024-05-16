import pako from 'pako';
// npm i --save-dev @types/pako

abstract class SType {
    constructor() {

    }
    setValue(value: Uint8Array | string | number) {
        this._setValue(value);
    }
    getValue(): Uint8Array | string | number | any {
        return this._getValue();
    }

    protected abstract _setValue(value: Uint8Array | string | number | null | any): void;
    protected abstract _getValue(): Uint8Array | string | number | any;

}

class SNumber extends SType {
    value: number | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _setValue(value: number): void { this.value = value; }
    protected _getValue(): number { return this.value as number; }
}

class SString extends SType {
    value: string | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _setValue(value: string): void { this.value = value; }
    protected _getValue(): string { return this.value as string; }
}

class U16 extends SNumber {
    nbBytes = 2;
    constructor() {
        super();
    }
    readData(reader: STypeRW) {
        let value = reader.dataView.getUint16(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
    }
    writeData() { }
}

class U32 extends SNumber {
    nbBytes = 4;
    constructor() {
        super();
    }
    readData(reader: STypeRW) {
        let value = reader.dataView.getUint32(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
    }
    writeData() { }
}

class F32 extends SNumber {
    nbBytes = 4;
    constructor() {
        super();
    }
    readData(reader: STypeRW) {
        let value = reader.dataView.getFloat32(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
    }
    writeData() { }
}

class Ascii extends SString {
    value: string | null;
    len: number | Function;
    constructor(len: number | Function) {
        super();
        this.value = null;
        this.len = len;
    }
    getLen() { return typeof this.len == "function" ? this.len() : this.len; }
    readData(reader: STypeRW) {
        let alen = this.getLen();
        let asciiBuffer = new Uint8Array(reader.dataView.buffer, reader.index, alen);
        const asciiDecoder = new TextDecoder();
        reader.index += alen;
        this.setValue(asciiDecoder.decode(asciiBuffer));
    }
    writeData() { }
}

class Str extends SString {
    value: string | null;
    len: U32 | U16;
    constructor(len: U32 | U16) {
        super();
        this.value = null;
        this.len = len;
        //console.log("@@len", len)
    }
    getLen(): U32 | U16 { return this.len; }
    readData(reader: STypeRW) {
        //console.log(this.getLen());
        let eLen = this.getLen()();
        eLen.readData(reader);
        let sLen = eLen.getValue();
        let strBuffer = new Uint8Array(reader.dataView.buffer, reader.index, sLen);
        const strDecoder = new TextDecoder();
        reader.index += sLen;
        this.setValue(strDecoder.decode(strBuffer));
    }
    writeData() { }
}

class ArrayData extends SType {
    value: Uint8Array | null;
    len: number | Function | null;
    constructor(len: number | Function) {
        super();
        this.value = null;
        this.len = len;
    }
    getLen() { return typeof this.len == "function" ? this.len() : this.len == Infinity ? undefined : this.len; }
    protected _setValue(value: Uint8Array): void { this.value = value; }
    protected _getValue(): Uint8Array { return this.value as Uint8Array; }
    readData(reader: STypeRW) {
        let dLen = this.getLen();
        let dataBuffer = new Uint8Array(reader.dataView.buffer, reader.index, dLen);
        this.setValue(dataBuffer);
        reader.index += dLen;
    }
    writeData() { }
}


class Section extends SType {
    value: Map<string, any>;
    sectionName: any;
    constructor(sectionName: any) {
        super();
        this.value = new Map();
        this.sectionName = sectionName;
        return new Proxy(this, {
            get(target, prop, receiver) {
                // Si la propriété demandée est une chaîne de caractères et existe dans la Map
                if (typeof prop === 'string' && target.value.has(prop as unknown as string)) {
                    return target.value.get(prop as unknown as string);
                }
                // Sinon, renvoyer la propriété standard
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                // Si la propriété est une chaîne de caractères, définir la valeur dans la Map
                if (typeof prop === 'string') {
                    target.value.set(prop as unknown as string, value);
                    return true;
                }
                // Sinon, définir la propriété standard
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
    // Itérateur
    [Symbol.iterator](): IterableIterator<[string, any]> {
        return this.map[Symbol.iterator]();
    }
    // Définir une signature d'index pour permettre l'accès par clé
    [key: string]: any | any;
    createSection() { this.sectionName(this.value); }
    protected _setValue(value: any): void { this.value = value; }
    protected _getValue(): any { return this.value as any; }
}

class Scenario extends Map {
    value: Map<string, any>;
    constructor() {
        super();
        this.value = new Map();
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof prop === 'string' && target.value.has(prop as unknown as string)) {
                    return target.value.get(prop as unknown as string);
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if (typeof prop === 'string') {
                    target.value.set(prop as unknown as string, value);
                    return true;
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
    clear(): void {
        this.value.clear();
    }
    delete(key: string): boolean {
        return this.value.delete(key);
    }
    forEach(callbackfn: (value: any, key: string, map: Map<string, any>) => void, thisArg?: any): void {
        this.value.forEach(callbackfn, thisArg);
    }
    has(key: string): boolean {
        return this.value.has(key);;
    }
    get size(): number {
        return this.value.size;
    }
    keys(): IterableIterator<string> {
        return this.value.keys();
    }
    values(): IterableIterator<any> {
        return this.value.values();
    }
    [Symbol.toStringTag]: string = 'Scenario';
    [Symbol.iterator](): IterableIterator<[string, any]> {
        return this.value[Symbol.iterator]();
    }
    [key: string]: any | any;
    set(key: string, value: any): this {
        this.value.set(key, value);
        return this;
    }
    get(key: string): any | undefined {
        return this.value.get(key);
    }
    entries() {
        return this.value.entries();
    }
    protected _setValue(value: any): void { this.value = value; }
    protected _getValue(): any { return this.value as any; }
}


class ArrayOf<T> extends SType {
    value: Array<T> = [];
    ofType: T;
    count: number | Function;
    constructor(ofType: T, count: number | Function) {
        super();
        this.ofType = ofType;
        this.count = count;
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    return target.value[Number(prop)];
                }
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                return Reflect.get(target.value, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    target.value[Number(prop)] = value;
                    return true;
                }
                if (prop in target) {
                    return Reflect.set(target, prop, value, receiver);
                }
                return Reflect.set(target.value, prop, value, receiver);
            },
            has(target, prop) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    return Number(prop) < target.value.length;
                }
                return prop in target || prop in target.value;
            },
            deleteProperty(target, prop) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    target.value.splice(Number(prop), 1);
                    return true;
                }
                return Reflect.deleteProperty(target, prop);
            },
            ownKeys(target) {
                return Reflect.ownKeys(target).concat(Reflect.ownKeys(target.value));
            },
            getOwnPropertyDescriptor(target, prop) {
                if (prop in target) {
                    return Object.getOwnPropertyDescriptor(target, prop);
                }
                return Object.getOwnPropertyDescriptor(target.value, prop);
            }
        });
    }
    [Symbol.iterator](): IterableIterator<T> { return this.value[Symbol.iterator](); }
    getCount(): number {
        let obCount = this.count()();
        console.log("Couuuuunt", obCount.getValue())
        return typeof this.count == "function" ? this.count() : this.count;
    }
    get [Symbol.toStringTag](): string { return 'ArrayOf'; }

    protected _setValue(value: any): void { throw new Error('Method not implemented.'); }
    protected _getValue() { throw new Error('Method not implemented.'); }
    readData(reader: STypeRW, processEntryCallback: Function) {
        console.log("@ArrayOf : count", this.count())
        let len: number = this.count().getValue();
        for (let i = 0; i < len; i++) {
            let myObjToPush = this.ofType();
            console.log("@ArrayOf : myObjToPush", myObjToPush)
            this.value.push(myObjToPush);
            processEntryCallback(null, null, myObjToPush);
            console.log(myObjToPush);

        }
    }

    // Méthodes pour manipuler le tableau
    push(...items: T[]): number { return this.value.push(...items); }
    pop(): T | undefined { return this.value.pop(); }
    shift(): T | undefined { return this.value.shift(); }
    unshift(...items: T[]): number { return this.value.unshift(...items); }
    splice(start: number, deleteCount?: number, ...items: T[]): T[] { return this.value.splice(start, deleteCount, ...items); }
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void { this.value.forEach(callbackfn, thisArg); }
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] { return this.value.map(callbackfn, thisArg); }
}

// Factories
function u32(): Function {
    return function () { return new U32(); };
}

function f32(): Function {
    return function () { return new F32(); };
}

function ascii(len: number | Function): Function {
    return function () { return new Ascii(len); };
}

function str(len: any): Function {
    return function () { return new Str(len); };
}

function arrayOf(ofType: any, count: number | Function): Function {
    return function () { return new ArrayOf<typeof ofType>(ofType, count); };
}

function arrayData(len: number | Function): Function {
    return function () { return new ArrayData(len); };
}

function section(sectionName: Function): Function {
    return function () { return new Section(sectionName); };
}

export function readScenario(myUint8Array: Uint8Array) {

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
    //console.log(scenario.mainHeader.compressedData);
    //console.log(scenario["mainHeader"].get("compressedData"));

    return scenario;
}

type STypeRW = {
    dataView: DataView;
    index: number;
}



function p_Scenario(o: Map<string, any>) {
    o.set("useMainDataView", null);
    o.set("mainHeader", section(p_MainHeader));
    o.set("useScenarioDataView", null);
    o.set("scenarioHeader", section(p_ScenarioHeader))
}

function p_MainHeader(o: Map<string, any>) {
    o.set("version", ascii(4));
    o.set("headerLength", u32());
    o.set("headerType", u32());
    o.set("lastSaveTimestamp", u32());
    o.set("instructions", str(u32()));
    o.set("individualVictories", u32());
    o.set("playerCount", u32());
    o.set("value1000", u32());
    o.set("gameEdition", u32());
    o.set("usedSetsCount", u32());
    console.log("@ p_MainHeader : usedSetsCount", o.get("usedSetsCount"))
    o.set("usedSets", arrayOf(u32(), () => o.get("usedSetsCount")));
    o.set("compressedData", arrayData(Infinity));
}

function p_ScenarioHeader(o: Map<string, any>) {
    o.set("nextUnitID", u32());
    o.set("version", f32());
}
