
type bufferReader = {
    dataView: DataView;
    index: number;
}

abstract class SType {
    constructor() {

    }
    setValue() {
        this._setValue();
    }
    geyValue() {
        this._getValue();
    }
    read(reader: any) {
        this._read(reader);
    }
    write(writer: any) {
        this._write(writer);
    }
    protected abstract _read(reader: any): void;
    protected abstract _write(writer: any): void;
    protected abstract _setValue(): void;
    protected abstract _getValue(): void;

}


class U16 { }
class U32 extends SType {
    value: number | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _read(reader: bufferReader): void {
        console.log("YEAH")
        let myDataView = reader.dataView;
        this.value = myDataView.getUint32(reader.index, true);
        reader.index += 4;

    }
    protected _write(writer: any): void { }
    protected _setValue(): void { }
    protected _getValue(): void { }
}
class Ascii { }
class Str extends SType {
    constructor(len: U32 | U16) {
        super();
        if (true) {

        }
    }
    protected _read(reader: any): void { }
    protected _write(writer: any): void { }
    protected _setValue(): void { }
    protected _getValue(): void { }
}
class ArrayData { }
class Section { }

function u32() {
    function _read(reader: bufferReader): void {
        console.log("YEAH")
        let myDataView = reader.dataView;
        let value = myDataView.getUint32(reader.index, true);
        reader.index += 4;
        console.log(value)
    }


    return { "type": U32, "value": undefined, "read": _read };
}

function ascii(len: number | Function) {
    console.log(len);
    return new Ascii();
}

function str(len: any) {
    console.log(len);
    return new Str(len);
}

function arrayData(len: number | Function) {
    console.log(len);
    return new ArrayData();
}

function section(sectionName: Function) {
    console.log(sectionName);
    let mySection = new Map();
    sectionName(mySection);
    return { "type": Section, "value": mySection };
}

export function readScenario(myUint8Array: Uint8Array) {
    let myBufferReader: bufferReader = {
        "index": 0,
        "dataView": new DataView(myUint8Array.buffer)
    }
    let scenario = processScenario();

    function processMe(me: IterableIterator<any>) {
        for (let entry of me) {
            console.log(entry[0], entry[1]);
            /*if (entry[1].type && entry[1].type == Section) {
                //console.log("@@@ Section @@@");
                processMe(entry[1].value.entries());
            } */
            switch (entry[1].type) {
                case Section: processMe(entry[1].value.entries()); break;
                default:
                    console.log("Read :");
                    entry[1].read && entry[1].read(myBufferReader);
            }
        }
    }

    processMe(scenario.entries());

}

function processScenario() {
    let o = new Map();
    o.set("mainHeader", section(processMainHeader));
    return o;
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
