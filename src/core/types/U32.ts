import { SNumber } from "./SNumber";

export class U32 extends SNumber {
    nbBytes = 4;
    constructor() {
        super();
    }

    read(reader: STypeRW):number {
        let value = reader.dataView.getUint32(reader.index, true);
        let valueBuffer = new Uint8Array(reader.dataView.buffer, reader.index, this.nbBytes);
        reader.index += this.nbBytes; 
        return { "typedValue": value, "rawValue": valueBuffer  };
    }

    _readData(reader: STypeRW, _key: string) {
        let value = reader.dataView.getUint32(reader.index, true);
        reader.index += this.nbBytes;
        this.setValue(value);
        //console.log(key +" :\n", this.value);
    }
    writeData() { }
}