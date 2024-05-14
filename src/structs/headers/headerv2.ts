class EnhMap<K extends string, V> {
    private map: Map<K, V>;

    constructor(entries?: readonly (readonly [K, V])[] | null) {
        this.map = new Map(entries);

        return new Proxy(this, {
            get(target, prop, receiver) {
                // Si la propriété demandée est une chaîne de caractères et existe dans la Map
                if (typeof prop === 'string' && target.map.has(prop as unknown as K)) {
                    return target.map.get(prop as unknown as K);
                }
                // Sinon, renvoyer la propriété standard
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                // Si la propriété est une chaîne de caractères, définir la valeur dans la Map
                if (typeof prop === 'string') {
                    target.map.set(prop as unknown as K, value);
                    return true;
                }
                // Sinon, définir la propriété standard
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    // Méthodes pour interagir avec la Map
    set(key: K, value: V): this {
        this.map.set(key, value);
        return this;
    }

    get(key: K): V | undefined {
        return this.map.get(key);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }
    entries() {
        return this.map.entries();
    }
    delete(key: K): boolean {
        return this.map.delete(key);
    }

    clear(): void {
        this.map.clear();
    }

    get size(): number {
        return this.map.size;
    }

    // Itérateur
    [Symbol.iterator](): IterableIterator<[K, V]> {
        return this.map[Symbol.iterator]();
    }

    // Définir une signature d'index pour permettre l'accès par clé
    [key: string]: V | any;
}

// Utilisation
let myMap = new EnhMap<string, any>([['name', 'Alice'], ['age', 30]]);

// Accès comme un objet
console.log(myMap['name']); // "Alice"
console.log(myMap['age']); // 30

// Modification comme un objet
myMap['name'] = 'Bob';
console.log(myMap['name']); // "Bob"

// Accès et modification via les méthodes de MyMap
myMap.set('location', 'Paris');
console.log(myMap.get('location')); // "Paris"






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


class U16 extends SType {
    value: number | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _setValue(value: number): void { this.value = value; }
    protected _getValue(): number { return this.value as number; }
}

class U32 extends SType {
    value: number | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _setValue(value: number): void { this.value = value; }
    protected _getValue(): number { return this.value as number; }
}

class Ascii extends SType {
    value: string | null;
    len: number | Function;
    constructor(len: number | Function) {
        super();
        this.value = null;
        this.len = len;
    }
    getLen() { return typeof this.len == "function" ? this.len() : this.len; }
    protected _setValue(value: string): void { this.value = value; }
    protected _getValue(): string { return this.value as string; }
}

class Str extends SType {
    value: string | null;
    len: U32 | U16;
    constructor(len: U32 | U16) {
        super();
        this.value = null;
        this.len = len;
        //console.log("@@len", len)
    }
    getLen(): U32 | U16 { return this.len; }
    protected _setValue(value: string): void { this.value = value; }
    protected _getValue(): string { return this.value as string; }
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
}


class Section extends SType {
    value: any;
    sectionName: any;
    constructor(sectionName: any) {
        super();
        this.value = new EnhMap();
        this.sectionName = sectionName;
    }
    createSection() { this.sectionName(this.value); }
    protected _setValue(value: any): void { this.value = value; }
    protected _getValue(): any { return this.value as any; }
}

function u32(): SType {
    return new U32();
}

function ascii(len: number | Function): SType {
    return new Ascii(len);
}

function str(len: any): SType {
    return new Str(len);
}

function arrayData(len: number | Function) {
    return new ArrayData(len);
}

function section(sectionName: Function) {
    return new Section(sectionName);
}

export function readScenario(myUint8Array: Uint8Array) {
    let myBufferReader: STypeRW = {
        "index": 0,
        "dataView": new DataView(myUint8Array.buffer)
    }
    let scenario = new EnhMap();
    processScenario(scenario);


    function processMe(me: IterableIterator<any>) {
        for (let [elementName, obj] of me) {
            //console.log(elementName, obj);
            switch (true) {
                case obj instanceof Section:
                    console.log("@@@ Section @@@");
                    obj.createSection();
                    processMe(obj.getValue().entries());
                    break;
                default:
                    readElement(obj, myBufferReader)
                    //console.log(obj.getValue());
            }
        }
    }

    processMe(scenario.entries());
    console.log(scenario["mainHeader"].getValue()["compressedData"]);
    //console.log(scenario["mainHeader"].get("compressedData"));

}

type STypeRW = {
    dataView: DataView;
    index: number;
}


function readElement(e: SType, reader: STypeRW) {
    switch (true) {
        case e instanceof U32:
            let value = reader.dataView.getUint32(reader.index, true);
            reader.index += 4;
            e.setValue(value);
            break;
        case e instanceof Ascii:
            let alen = e.getLen();
            let asciiBuffer = new Uint8Array(reader.dataView.buffer, reader.index, alen);
            const asciiDecoder = new TextDecoder();
            reader.index += alen;
            e.setValue(asciiDecoder.decode(asciiBuffer));
            break;
        case e instanceof Str:
            let eLen = e.getLen();
            readElement(eLen, reader);
            let sLen = eLen.getValue();
            console.log(sLen);
            let strBuffer = new Uint8Array(reader.dataView.buffer, reader.index, sLen);
            const strDecoder = new TextDecoder();
            reader.index += sLen;
            e.setValue(strDecoder.decode(strBuffer));
            break;
        case e instanceof ArrayData:
            let dLen = e.getLen();
            let dataBuffer = new Uint8Array(reader.dataView.buffer, reader.index, dLen);
            e.setValue(dataBuffer);
            reader.index += dLen;
            break;
        case e instanceof Section:
            //e.createSection();
            break;
    }
}
/*function writeElement(e) {

}*/

function processScenario(o: EnhMap<string, any>) {
    o.set("mainHeader", section(processMainHeader));
}

function processMainHeader(o: EnhMap<string, any>) {
    o.set("version", ascii(4));
    o.set("headerLength", u32());
    o.set("headerType", u32());
    o.set("lastSaveTimestamp", u32());
    o.set("instructions", str(u32()));
    o.set("individualVictories", u32());
    o.set("playerCount", u32());
    o.set("compressedData", arrayData(Infinity));
}
