
import { SString } from "./SString";
import { SType } from "./SType";

export class Str extends SString {

    value: string | null;
    len: () => SType<number>;

    constructor(len: () => SType<number>) {
        super();
        this.value = null;
        this.len = len;
    }

    getLen(): SType<number> { return this.len(); }

    _readData(reader: STypeRW, key: string) {
        let eLen = this.getLen();
        eLen.readData(reader, key + "_len");
        let sLen = eLen.getValue();
        let strBuffer = new Uint8Array(reader.dataView.buffer, reader.index, sLen);
        const strDecoder = new TextDecoder();
        reader.index += sLen;
        this.setValue(strDecoder.decode(strBuffer));
        //console.log(key +" :\n", this.value);
    }

    writeData() { }
}