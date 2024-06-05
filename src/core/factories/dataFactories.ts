import { ArrayData } from "../types/ArrayData";
import { ArrayOf } from "../types/ArrayOf";
import { Ascii } from "../types/Ascii";
import { CountOf } from "../types/CountOf";
import { F32 } from "../types/F32";
import { SType } from "../types/SType";
import { Section } from "../types/Section";
import { Str } from "../types/Str";
import { U16 } from "../types/U16";
import { U32 } from "../types/U32";
import { U8 } from "../types/U8";





export function u32(): () => SType<number> {
    return function () { return new U32(); };
}

export function u16(): () => SType<number> {
    return function () { return new U16(); };
}

export function u8(): () => SType<number> {
    return function () { return new U8(); };
}

export function f32(): () => SType<number> {
    return function () { return new F32(); };
}

export function ascii(len: number | Function): () => SType<string> {
    return function () { return new Ascii(len); };
}

export function str(len: any): () => SType<string> {
    return function () { return new Str(len); };
}

export function countOf<T>(ofType: T, count: Function): () => SType<number> {
    return function () { return new CountOf<T>(ofType, count); };
}

export function arrayOf<T>(ofType: T, count: number | Function): () => SType<Array<T>> {
    return function () { return new ArrayOf<T>(ofType, count); };
}

export function arrayData(len: number | Function): () => SType<Uint8Array> {
    return function () { return new ArrayData(len); };
}

export function section(sectionName: Function, ...args: any): () => SType<Section> {
    return function () { return new Section(sectionName, ...args); };
}