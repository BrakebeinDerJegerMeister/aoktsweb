import { SNumber } from "./SNumber";

interface ReadResult {
    typedValue: number;        // Puisque `getUint32` retourne un nombre
    rawValue: Uint8Array;      // Correspond à un tableau d'octets
}

export class U32 extends SNumber {
    nbBytes = 4;
    constructor() {
        super();
    }

    
    read(reader: STypeRW):ReadResult {
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