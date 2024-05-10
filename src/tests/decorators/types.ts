// decorators/types.ts

export interface FieldMetadata {
    propertyKey: string;
    type: string;
    length?: number;
}

export interface TypedConstructor {
    new (...args: any[]): any;
    fields?: FieldMetadata[];
}
