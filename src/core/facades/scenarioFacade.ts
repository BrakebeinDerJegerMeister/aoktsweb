// description.ts
export interface SerializationDescription {
    type: string;
    arguments?: any[];
}

export interface StructureDescription {
    [key: string]: SerializationDescription;
}

export const myStructureDescription: StructureDescription = {
    someU16: { type: 'u16' },
    someString: { type: 'StringWithU16Length' },
    someArray: { type: 'Array', arguments: ['u32', function () { return myStructureDescription.someU16; }] },
    someArray2: { type: 'Array', arguments: ['u32', () => myStructureDescription.someU16] }
};

