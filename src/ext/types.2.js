/* eslint-disable no-unused-vars */


class EIO {
    /**
     * @type {DataView} dataview
     */
    #dataView;
    #ioInstance;
    #value;
    #ioData;
    constructor (ioInstance, ioData) {
        console.log(ioInstance)
        this.#ioInstance = ioInstance;
        this.#ioData = ioData;
        this.#dataView = this.#ioInstance.dataView;
    }
    get dataView() {
        return this.#dataView;
    }
    get ioInstance() {
        return this.#ioInstance;
    }
    get ioData() {
        return this.#ioData;
    }
    get value() {
        return this.#value;
    }
    set value(v) {
        this.#value = v;
    }
    _read() {
    }

    read() {
        if ((this.ioData.use instanceof Function) && (this.ioData.use() === false)) { console.log("Do not use"); return }
        // =============== Read ==============
        this.offset = this.ioInstance.currentIndex;
        let ret = this._read();
        // ===================================
        if (this.ioData.showMe == true) {
            if (this.ioData.value instanceof Object) {
                console.log("%cObject", "color: yellow; background-color: black");
                console.log(this.ioData);
            } else {
                console.log("%c" + this.ioData.value, "color: yellowgreen; background-color: black");
            }
        }
        if (this.ioData.showMeMore == true) {
            console.log("---------------------");
            if (this.ioData.value instanceof Object) {
                console.log("Value : %c" + this.ioData.varName, "color: yellow; background-color: black");
                console.log("%cObject", "color: yellowgreen; background-color: black");
                console.log(this.ioData);
            } else {
                console.log("Name : %c" + this.ioData.varName, "color: yellow; background-color: black");
                console.log("Value : %c" + this.ioData.value, "color: yellowgreen; background-color: black");
                console.log("Offset : %c" + this.offset, "color: yellowgreen; background-color: black");
            }
            console.log("---------------------");
        }
        if (this.ioData.afterRead instanceof Function) { this.ioData.afterRead(); }
        // ============== Hook end =================
        // this.ioData.value = this.value;
        return ret;
    }
}

class F32 extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        this.value = this.dataView.getFloat32(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(4);
        this.ioData.value = this.value;
    }
    write() {

    }
}


class U32 extends EIO {
    #debug = {};
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
        this.#debug.strName = ioData.debug;
    }
    _read() {
        if (this.#debug.strName) {
            console.log("%c@@@[ " + this.#debug.strName + " (" + this.ioInstance.currentIndex + ") ]@@@", "color : yellow");
        }
        this.value = this.dataView.getUint32(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(4);
        if (this.#debug.strName) {
            console.log(this.value);
        }
        this.ioData.value = this.value;
    }
    write() {

    }
}


class U16 extends EIO {
    #debug = {};
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        this.value = this.dataView.getUint16(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(2);
        this.ioData.value = this.value;
    }
    write() {

    }
}

class U8 extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        this.value = this.dataView.getUint8(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(1);
        this.ioData.value = this.value;
    }
    write() {

    }
}

class S16 extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        this.value = this.dataView.getInt16(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(2);
        this.ioData.value = this.value;
    }
    write() {

    }
}

class S8 extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        this.value = this.dataView.getInt8(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(1);
        this.ioData.value = this.value;
    }
    write() {

    }
}

class S32 extends EIO {
    #debug = {};
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
        this.#debug.strName = ioData.debug;
    }
    _read() {
        if (this.#debug.strName) {
            console.log("%c@@@[ " + this.#debug.strName + " (" + this.ioInstance.currentIndex + ") ]@@@", "color : yellow");
        }
        this.value = this.dataView.getInt32(this.ioInstance.currentIndex, true);
        this.ioInstance.jump(4);
        if (this.#debug.strName) {
            console.log(this.value);
        }
        this.ioData.value = this.value;
    }
    write() {

    }
}

class Str extends EIO {
    #lenType;
    #len;
    #debug = {};
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
        this.#lenType = ioData.lenType;
        this.#debug.strName = ioData.debug;
    }
    _read() {
        try {
            if (this.#debug.strName) {
                console.log("%c@@@[ " + this.#debug.strName + " (" + this.ioInstance.currentIndex + ") ]@@@", "color : yellow");
            }
            this.#len = new this.#lenType.type(this.ioInstance, this.#lenType);
            this.#len.read();
            const decoder = new TextDecoder();
            const buffer = new Uint8Array(this.dataView.buffer, this.ioInstance.currentIndex, this.#len.value);
            this.ioInstance.jump(this.#len.value);
            this.value = decoder.decode(buffer);
            if (this.#debug.strName) {
                console.log(this.value);
            }
            this.ioData.value = this.value;
        } catch (err) {
            //console.log(err);
            console.log(">>>>> ======[ Str ]======");
            console.log("index :", this.ioInstance.currentIndex);
            console.log("len :", this.#len.value);
            console.log("<<<<<");
        }
    }
    write() {

    }
}

class Ascii extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        let len = this.ioData.count instanceof Function ? this.ioData.count() : this.ioData.count
        const decoder = new TextDecoder();
        const buffer = new Uint8Array(this.dataView.buffer, this.ioInstance.currentIndex, len);
        this.ioInstance.jump(len);
        this.value = decoder.decode(buffer);
        this.ioData.value = this.value;
        //return this.value;
    }
    write() {

    }

}

class ArrayOf extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
        this.value = [];
    }
    _read() {
        let count = this.ioData.count instanceof Function ? this.ioData.count() : this.ioData.count;
        let ofType = this.ioData.ofType;
        for (let i = 0; i < count; i++) {
            let element = new ofType.type(this.ioInstance, ofType);
            element.read();
            this.value.push(element.value);
        }
        this.ioData.value = this.value;
    }
    write() {

    }
}

class ArrayData extends EIO {
    #count;
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
        this.#count = ioData.count instanceof Function ? ioData.count() : ioData.count;
        this._count = this.#count;
    }
    _read() {
        let len = this.#count == Infinity ? this.dataView.buffer.byteLength - this.ioInstance.currentIndex : this.#count;
        const buffer = new Uint8Array(this.dataView.buffer, this.ioInstance.currentIndex, len);
        this.ioInstance.jump(len);
        this.value = buffer;
        this.ioData.value = this.value;
    }
    write() {

    }
}

class Section extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        console.log("=======[ Parsing " + this.ioData.ofClass.name + " ]=======\n\n");
        let section = new this.ioData.ofClass();
        for (let [k, v] of Object.entries(section)) {
            let { type: FoundType } = v;

            //if (v.isSubStruct) {
            //    console.log("@@( subStruct 1 )@@")
            //console.log(v)
            //    this.parseSection(new v.ofClass())
            //} else if (v.isStruct) {
            //this.parseSection(new FoundType())
            //} else {
            let data = new FoundType(this, v);
            data.read();
            //this.value = data.value;
            if (v.log) {
                console.log(k, v.value);
            }
            //}
        }
        this.value = section;
        this.ioData.value = section;
    }
    write() {

    }
}

class SubSection extends EIO {
    constructor (ioInstance, ioData = {}) {
        super(ioInstance, ioData);
    }
    _read() {
        //console.log("@@( subStruct (" + this.ioData.ofClass.name + ") )@@")
        //console.log("@@( subStruct )@@")
        let sub = new this.ioData.ofClass(this.ioInstance);

        for (let [k, v] of Object.entries(sub)) {
            let { type: FoundType } = v;
            let element = new FoundType(this.ioInstance, v);
            element.read()
        }
        this.value = sub;
        this.ioData.value = sub;
        //return sub;
    }
    write() {

    }
}


export function ascii(len, ...params) { return Object.assign({ "type": Ascii, "count": len, "value": null }, ...params); }
export function u8(...params) { return Object.assign({ "type": U8, "value": null }, ...params); }
export function u16(...params) { return Object.assign({ "type": U16, "value": null }, ...params); }
export function u32(...params) { return Object.assign({ "type": U32, "value": null }, ...params); }
export function f32(...params) { return Object.assign({ "type": F32, "value": null }, ...params); }
export function s8(...params) { return Object.assign({ "type": S8, "value": null }, ...params); }
export function s16(...params) { return Object.assign({ "type": S16, "value": null }, ...params); }
export function s32(...params) { return Object.assign({ "type": S32, "value": null }, ...params); }
export function str(lentype, ...params) { return Object.assign({ "type": Str, "lenType": lentype, "value": null }, ...params) }
export function arrayOf(ofType, count, ...params) { return Object.assign({ "type": ArrayOf, "ofType": ofType, "count": count, "value": null }, ...params); }
export function arrayData(count, ...params) { return Object.assign({ "type": ArrayData, "count": count, "value": null }, ...params) }

export function section(ofClass, ...params) { return Object.assign({ "type": Section, "ofClass": ofClass, "isSection": true }, ...params) }
export function subSection(ofClass, ...params) { return Object.assign({ "type": SubSection, "ofClass": ofClass, "isSubSection": true }, ...params) }

