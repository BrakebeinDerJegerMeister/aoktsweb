import { SType } from "./SType";

export abstract class SNumber extends SType<number> {
    value: number | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _setValue(value: number): void { this.value = value; }
    protected _getValue(): number { return this.value as number; }
}
