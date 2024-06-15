import { SType } from "./SType";

export class Section extends SType<Section> {
    private _myMap: Map<string, any>;
    private _myArgs;
    sectionName: any;
    constructor(sectionName: any, ...args:any) {
        super();
        this._myMap = new Map();
        this.sectionName = sectionName;
        //console.log(args);
        this._myArgs = args;
    }
    createSection() { 
        //console.log("Section :", this.sectionName.name);
        this.sectionName(this._myMap, ...this._myArgs); 
    }
    protected _setValue(value: any): void { this._myMap = value; }
    protected _getValue(): any { return this._myMap as any; }
    public get(propertyName : string) { return this._myMap.get(propertyName); }
    public values() { return this.values; }
    public keys() { return this.keys; }
    public entries() { return this.entries; }

}