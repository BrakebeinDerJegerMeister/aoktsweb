import { SString } from "./SString";

export class Ascii extends SString {
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