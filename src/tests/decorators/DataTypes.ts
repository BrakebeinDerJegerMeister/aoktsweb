// decorators/DataTypes.ts

import { TypedConstructor } from './types';

function registerField(target: Object, propertyKey: string, type: string, length?: number) {
    const constructor: TypedConstructor = target.constructor as TypedConstructor;
    if (!constructor.fields) {
        constructor.fields = [];
    }
    constructor.fields.push({ propertyKey, type, length });
}

export function Uint32(target: Object, propertyKey: string) {
    registerField(target, propertyKey, 'uint32');
}

export function StringLength(length: number): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        if (typeof propertyKey === "string") {
            registerField(target, propertyKey, 'string', length);
        }
    }
}
