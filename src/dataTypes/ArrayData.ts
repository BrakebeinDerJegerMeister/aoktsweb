import { SType } from "@dataTypes/SType";

export class ArrayData extends SType<Uint8Array> {
    value: Uint8Array ;
    len: number | Function | null;
    constructor(len: number | Function) {
        super();
        this.value = new Uint8Array();
        this.len = len;
    }
    getLen() { return typeof this.len == "function" ? this.len() : (this.len == Infinity ? undefined : this.len); }
    protected _setValue(value: Uint8Array): void { this.value = value; }
    protected _getValue(): Uint8Array { return this.value; }
    _readData(reader: STypeRW, _key: string) {
        let dLen = this.getLen();
        let dataBuffer = new Uint8Array(reader.dataView.buffer, reader.index, dLen);
        this.setValue(dataBuffer);
        reader.index += dLen;
        //console.log(key +" :\n", this.value);
    }
    writeData() { 
        console.log("");
    }
}