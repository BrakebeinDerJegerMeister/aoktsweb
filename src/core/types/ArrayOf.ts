import { SType } from "./SType";

export class ArrayOf<T> extends SType {
    value: Array<T> = [];
    ofType: T;
    count: number | Function;
    constructor(ofType: T, count: number | Function) {
        super();
        this.ofType = ofType;
        this.count = count;
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    return target.value[Number(prop)];
                }
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                return Reflect.get(target.value, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    target.value[Number(prop)] = value;
                    return true;
                }
                if (prop in target) {
                    return Reflect.set(target, prop, value, receiver);
                }
                return Reflect.set(target.value, prop, value, receiver);
            },
            has(target, prop) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    return Number(prop) < target.value.length;
                }
                return prop in target || prop in target.value;
            },
            deleteProperty(target, prop) {
                if (typeof prop === 'string' && !isNaN(Number(prop))) {
                    target.value.splice(Number(prop), 1);
                    return true;
                }
                return Reflect.deleteProperty(target, prop);
            },
            ownKeys(target) {
                return Reflect.ownKeys(target).concat(Reflect.ownKeys(target.value));
            },
            getOwnPropertyDescriptor(target, prop) {
                if (prop in target) {
                    return Object.getOwnPropertyDescriptor(target, prop);
                }
                return Object.getOwnPropertyDescriptor(target.value, prop);
            }
        });
    }
    [Symbol.iterator](): IterableIterator<T> { return this.value[Symbol.iterator](); }
    getCount(): number {
        let obCount = this.count()();
        console.log("Couuuuunt", obCount.getValue())
        return typeof this.count == "function" ? this.count() : this.count;
    }
    get [Symbol.toStringTag](): string { return 'ArrayOf'; }

    protected _setValue(value: any): void { throw new Error('Method not implemented.'); }
    protected _getValue() { throw new Error('Method not implemented.'); }

    readData(reader: STypeRW, key: string, processEntryCallback: Function) {
        //console.log(key);
        //console.log("@ArrayOf : count", this.count)
        let len: number = typeof this.count == "number" ? this.count : this.count().getValue();
        console.log("Array ("+len+") :", key)
        for (let i = 0; i < len; i++) {
            let myObjToPush = this.ofType;
            //console.log("@ArrayOf : myObjToPush", myObjToPush)
            this.value.push(myObjToPush);
            console.log(key+"_"+i, myObjToPush);
            processEntryCallback(null, key, myObjToPush);
            //console.log(myObjToPush);

        }
    }

    // Méthodes pour manipuler le tableau
    push(...items: T[]): number { return this.value.push(...items); }
    pop(): T | undefined { return this.value.pop(); }
    shift(): T | undefined { return this.value.shift(); }
    unshift(...items: T[]): number { return this.value.unshift(...items); }
    splice(start: number, deleteCount?: number, ...items: T[]): T[] { return this.value.splice(start, deleteCount, ...items); }
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void { this.value.forEach(callbackfn, thisArg); }
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] { return this.value.map(callbackfn, thisArg); }
}
