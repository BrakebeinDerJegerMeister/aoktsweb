export abstract class SType<T> {
    
    setValue(value: T) {
        this._setValue(value);
    }
    getValue(): T {
        return this._getValue();
    }
    readData(reader: STypeRW, key: string, processEntryCallback?: Function) : void {
        return this._readData(reader, key, processEntryCallback);
    }
    protected abstract _setValue(value: T): void;
    protected abstract _getValue(): T;
    protected abstract _readData(reader: STypeRW, key: string, processEntryCallback?: Function): void;

}