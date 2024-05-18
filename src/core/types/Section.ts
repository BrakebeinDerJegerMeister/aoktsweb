import { SType } from "./SType";

export class Section extends SType {
    value: Map<string, any>;
    sectionName: any;
    constructor(sectionName: any) {
        super();
        this.value = new Map();
        this.sectionName = sectionName;
        return new Proxy(this, {
            get(target, prop, receiver) {
                // Si la propriété demandée est une chaîne de caractères et existe dans la Map
                if (typeof prop === 'string' && target.value.has(prop as unknown as string)) {
                    return target.value.get(prop as unknown as string);
                }
                // Sinon, renvoyer la propriété standard
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                // Si la propriété est une chaîne de caractères, définir la valeur dans la Map
                if (typeof prop === 'string') {
                    target.value.set(prop as unknown as string, value);
                    return true;
                }
                // Sinon, définir la propriété standard
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
    // Itérateur
    [Symbol.iterator](): IterableIterator<[string, any]> {
        return this.map[Symbol.iterator]();
    }
    // Définir une signature d'index pour permettre l'accès par clé
    [key: string]: any | any;
    createSection() { this.sectionName(this.value); }
    protected _setValue(value: any): void { this.value = value; }
    protected _getValue(): any { return this.value as any; }
}