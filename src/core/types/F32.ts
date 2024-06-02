import { SNumber } from "./SNumber";

export class F32 extends SNumber {
    nbBytes = 4;
    constructor() {
        super();
    }
    _readData(reader: STypeRW, key: string) {
        let value = reader.dataView.getFloat32(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
        //console.log(key +" :\n", this.value);
    }
    writeData() { }
}