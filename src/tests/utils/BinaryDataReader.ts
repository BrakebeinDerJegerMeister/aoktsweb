// utils/BinaryDataReader.ts
export class BinaryDataReader {
    private buffer: ArrayBuffer;
    private dataView: DataView;
    private offset: number;

    constructor(buffer: ArrayBuffer) {
        this.buffer = buffer;
        this.dataView = new DataView(buffer);
        this.offset = 0;
    }

    readUint32(): number {
        const value = this.dataView.getUint32(this.offset, true);
        this.offset += 4;
        return value;
    }

    readUint16(): number {
        const value = this.dataView.getUint16(this.offset, true);
        this.offset += 2;
        return value;
    }

    readString(length: number): string {
        const bytes = new Uint8Array(this.buffer, this.offset, length);
        const string = String.fromCharCode(...bytes);
        this.offset += length;
        return string;
    }

    readArray(length: number): number[] {
        const array = [];
        for (let i = 0; i < length; i++) {
            array.push(this.readUint32());
        }
        return array;
    }

    skipBytes(count: number): void {
        this.offset += count;
    }
}
