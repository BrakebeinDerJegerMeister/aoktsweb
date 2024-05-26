import { SNumber } from "./SNumber";

export class U16 extends SNumber {
    nbBytes = 2;
    constructor() {
        super();
    }
    _readData(reader: STypeRW, key: string) {
        let value = reader.dataView.getUint16(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
        console.log(key +" :\n", this.value);
    }
    writeData() { }
}