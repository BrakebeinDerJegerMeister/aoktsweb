/* eslint-disable no-unused-vars */


class EIO {
    constructor() {

    }
    get dataView() { return null; }
    get ioInstance() { return null; }
    get ioData() { return null; }
    get value() { return null; }
    set value(v) { console.log(v); }
    _read() { }

    read() {
        let ret = this._read();
        return ret;
    }
}

class F32 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class U32 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class U16 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class U8 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class S16 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class S8 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class S32 extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}
class Str extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class Ascii extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class ArrayOf extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class ArrayData extends EIO {
    constructor() { super(); }
    _read() {
    }
    write() { }
}

class Section extends EIO {
    constructor() { super(); }
    _read() { }
    write() { }
}

class SubSection extends EIO {
    constructor() { super(); }
    _read() { }
    write() { }
}


export function ascii(len: number | Function, ...params: any | null) { return Object.assign({ "type": Ascii, "count": len }, ...params); }
export function u8(...params: any | null) { return Object.assign({ "type": U8 }, ...params); }
export function u16(...params: any | null) { return Object.assign({ "type": U16 }, ...params); }
export function u32(...params: any | null) { return Object.assign({ "type": U32 }, ...params); }
export function f32(...params: any | null) { return Object.assign({ "type": F32 }, ...params); }
export function s8(...params: any | null) { return Object.assign({ "type": S8 }, ...params); }
export function s16(...params: any | null) { return Object.assign({ "type": S16 }, ...params); }
export function s32(...params: any | null) { return Object.assign({ "type": S32 }, ...params); }
export function str(lentype: typeof u16 | typeof u32, ...params: any | null) { return Object.assign({ "type": Str, "lenType": lentype }, ...params) }
export function arrayOf(ofType:EIO, count:number | Function, ...params: any | null) { return Object.assign({ "type": ArrayOf, "ofType": ofType, "count": count }, ...params); }
export function arrayData(count:number | Function, ...params: any | null) { return Object.assign({ "type": ArrayData, "count": count }, ...params) }

export function section<T>(ofClass : new () => T, ...params: any | null) { return Object.assign({ "type": Section, "ofClass": ofClass, "isSection": true }, ...params) }
export function subSection(ofClass :typeof section,  ...params: any | null) { return Object.assign({ "type": SubSection, "ofClass": ofClass, "isSubSection": true }, ...params) }

