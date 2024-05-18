import { SType } from "./SType";

export class ArrayData extends SType {
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