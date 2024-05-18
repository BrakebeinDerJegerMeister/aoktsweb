import { ArrayData } from "../types/ArrayData";
import { ArrayOf } from "../types/ArrayOf";
import { Ascii } from "../types/Ascii";
import { F32 } from "../types/F32";
import { Section } from "../types/Section";
import { Str } from "../types/Str";
import { U32 } from "../types/U32";

export function u32(): Function {
    return function () { return new U32(); };
}

export function f32(): Function {
    return function () { return new F32(); };
}

export function ascii(len: number | Function): Function {
    return function () { return new Ascii(len); };
}

export function str(len: any): Function {
    return function () { return new Str(len); };
}

export function arrayOf(ofType: any, count: number | Function): Function {
    return function () { return new ArrayOf<typeof ofType>(ofType, count); };
}

export function arrayData(len: number | Function): Function {
    return function () { return new ArrayData(len); };
}

export function section(sectionName: Function): Function {
    return function () { return new Section(sectionName); };
}