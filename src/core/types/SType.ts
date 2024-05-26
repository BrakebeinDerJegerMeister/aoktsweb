export abstract class SType<T> {
    constructor() {

    }
    setValue(value: T) {
        this._setValue(value);
    }
    getValue(): T {
        return this._getValue();
    }

    protected abstract _setValue(value: T): void;
    protected abstract _getValue(): T;

}