

abstract class SType {
    constructor() {

    }
    setValue(value: string | number) {
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
    getLen() { return typeof this.len == "function" ? this.len() : this.len; }
    protected _setValue(value: Uint8Array): void { this.value = value; }
    protected _getValue(): Uint8Array { return this.value as Uint8Array; }
}


class Section extends SType {
    value: any;
    sectionName: any;
    constructor(sectionName: any) {
        super();
        this.value = new Map();
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
    let scenario = new Map();
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
                    console.log(obj.getValue());
            }
        }
    }

    processMe(scenario.entries());

    console.log(scenario);

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
        case e instanceof Section:
            //e.createSection();
            break;
    }
}
/*function writeElement(e) {

}*/

function processScenario(o: Map<string, any>) {
    o.set("mainHeader", section(processMainHeader));
}

function processMainHeader(o: Map<string, any>) {
    o.set("version", ascii(4));
    o.set("headerLength", u32());
    o.set("headerType", u32());
    o.set("lastSaveTimestamp", u32());
    o.set("instructions", str(u32()));
    o.set("individualVictories", u32());
    o.set("playerCount", u32());
    o.set("compressedData", arrayData(Infinity));
}
