export abstract class SType {
    constructor() {

    }
    setValue(value: Uint8Array | string | number) {
        this._setValue(value);
    }
    getValue(): Uint8Array | string | number | any {
        return this._getValue();
    }

    protected abstract _setValue(value: Uint8Array | string | number | null | any): void;
    protected abstract _getValue(): Uint8Array | string | number | any;

}