import { SType } from "./SType";

export class SString extends SType<string> {
    value: string | null;
    constructor() {
        super();
        this.value = null;
    }
    protected _setValue(value: string): void { this.value = value; }
    protected _getValue(): string { return this.value as string; }
}