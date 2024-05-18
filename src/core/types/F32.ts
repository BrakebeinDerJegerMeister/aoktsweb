import { SNumber } from "./SNumber";

export class F32 extends SNumber {
    nbBytes = 4;
    constructor() {
        super();
    }
    readData(reader: STypeRW) {
        let value = reader.dataView.getFloat32(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
    }
    writeData() { }
}