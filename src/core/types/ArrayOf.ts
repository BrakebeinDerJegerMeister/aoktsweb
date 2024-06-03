import { SType } from "./SType";

export class ArrayOf<T> extends SType<Array<T>> {
    value: Array<T> = [];
    ofType: T;
    count: number | Function;
    constructor(ofType: T, count: number | Function) {
        super();
        this.ofType = ofType;
        this.count = count;
    }

    getCount(): number {
        return typeof this.count == "function" ? this.count() : this.count;
    }
    
    get [Symbol.toStringTag](): string { return 'ArrayOf'; }

    protected _setValue(_value: Array<T>): void { throw new Error('Method not implemented.'); }
    protected _getValue(): Array<T> { 
        return this.value;
    }

    _readData(_reader: STypeRW, key: string, processEntryCallback: Function) {
        let len: number = typeof this.count == "number" ? this.count : this.count().getValue();
        //console.log("Array (" + len + ") :", key)
        for (let i = 0; i < len; i++) {
            let myObj = this.ofType;
            let myRet = processEntryCallback(this.value, key, myObj);
            this.value.push(myRet);
        }
    }
}
