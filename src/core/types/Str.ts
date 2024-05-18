import { SString } from "./SString";
import { U16 } from "./U16";
import { U32 } from "./U32";

export class Str extends SString {
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