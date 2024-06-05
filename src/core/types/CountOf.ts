import { SType } from "./SType";

export class CountOf<T> extends SType<number> {
    value: number;
    ofType: T;
    count: Function;
    constructor(ofType: T, count: Function) {
        super();
        this.ofType = ofType;
        this.count = count;
        this.value = 0;
    }
    _readData(_reader: STypeRW, key: string, processEntryCallback: Function) {
        let myObj = this.ofType;
        let myRet = processEntryCallback(this.value, key, myObj);
        this.setValue(myRet.getValue());
    }
    writeData() {
        console.log("");
     }
    protected _setValue(value: number): void {
        this.value = value;
    }
    protected _getValue(): number {
        return this.value;
    }
}