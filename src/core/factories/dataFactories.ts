import { ArrayData } from "../../dataTypes/ArrayData";
import { ArrayOf } from "../../dataTypes/ArrayOf";
import { Ascii } from "../../dataTypes/Ascii";
import { CountOf } from "../../dataTypes/CountOf";
import { F32 } from "../../dataTypes/F32";
import { SType } from "../../dataTypes/SType";
import { Section } from "../../dataTypes/Section";
import { Str } from "../../dataTypes/Str";
import { U16 } from "../../dataTypes/U16";
import { U32 } from "../../dataTypes/U32";
import { U8 } from "../../dataTypes/U8";





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