import { SType } from "./SType";

export class Section extends SType {
    private _myMap: Map<string, any>;
    sectionName: any;
    constructor(sectionName: any) {
        super();
        this._myMap = new Map();
        this.sectionName = sectionName;
    }
    // Itérateur
    [Symbol.iterator](): IterableIterator<[string, any]> {
        return this.map[Symbol.iterator]();
    }
    // Définir une signature d'index pour permettre l'accès par clé
    [key: string]: any | any;
    createSection() { this.sectionName(this._myMap); }
    protected _setValue(value: any): void { this._myMap = value; }
    protected _getValue(): any { return this._myMap as any; }
    public get(propertyName : string) { return this._myMap.get(propertyName); }
    public values() { return this.values; }
    public keys() { return this.keys; }
    public entries() { return this.entries; }
}