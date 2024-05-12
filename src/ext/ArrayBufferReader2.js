class ArrayBufferReader {
  constructor (arrayBuffer) {
    this.dataView = new DataView(arrayBuffer);
    this.currentIndex = 0;
  }
  read(data) {
    //let ret;
    switch (data.type) {
      case "char":
        break;
      case "array":
        data.value = [];
        console.log(data.len)
        for (let i = 0; i < data.len; i++) {
          data.value.push(this.readU32());
        }
        break;
      case "str":
        data.value = this.readChars(data.len)
        break;
      case "u32":
        data.value = this.readU32();
        break;
      case "skip32":
        this.skip(4);
        data.value = null;
        break;
      default:
      //ret = null
    }
    //return ret;
  }

  readChars(n) {
    const decoder = new TextDecoder();
    const buffer = new Uint8Array(this.dataView.buffer, this.currentIndex, n);
    this.currentIndex += n;
    return decoder.decode(buffer);
  }

  readS32() {
    const value = this.dataView.getInt32(this.currentIndex, true);
    this.currentIndex += 4;
    return value
  }

  readU32() {
    const value = this.dataView.getUint32(this.currentIndex, true);
    this.currentIndex += 4;
    return value;
  }

  readU16() {
    const value = this.dataView.getUint16(this.currentIndex, true);
    this.currentIndex += 2;
    return value;
  }

  readU16varStr() {
    const strLen = this.readU16();
    return this.readChars(strLen);
  }

  readU32varStr() {
    const strLen = this.readU32();
    return this.readChars(strLen);
  }

  resetIndex() {
    this.currentIndex = 0;
  }

  skip(n) {
    this.currentIndex += n;
  }

  back(n) {
    this.currentIndex -= n;
  }
}

export default ArrayBufferReader;
