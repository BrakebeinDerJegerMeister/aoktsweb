export class Scenario extends Map {
    value: Map<string, any>;
    constructor() {
        super();
        this.value = new Map();
    }
    clear(): void {
        this.value.clear();
    }
    delete(key: string): boolean {
        return this.value.delete(key);
    }
    forEach(callbackfn: (value: any, key: string, map: Map<string, any>) => void, thisArg?: any): void {
        this.value.forEach(callbackfn, thisArg);
    }
    has(key: string): boolean {
        return this.value.has(key);;
    }
    get size(): number {
        return this.value.size;
    }
    keys(): IterableIterator<string> {
        return this.value.keys();
    }
    values(): IterableIterator<any> {
        return this.value.values();
    }
    set(key: string, value: any): this {
        this.value.set(key, value);
        return this;
    }
    get(key: string): any | undefined {
        return this.value.get(key);
    }
    entries() {
        return this.value.entries();
    }
    protected _setValue(value: any): void { this.value = value; }
    protected _getValue(): any { return this.value as any; }
}
