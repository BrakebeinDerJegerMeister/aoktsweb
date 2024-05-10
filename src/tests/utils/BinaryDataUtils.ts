// utils/BinaryDataUtils.ts
import { BinaryDataReader } from './BinaryDataReader';

export abstract class BinaryDataUtils {
    protected reader!: BinaryDataReader;

    constructor(buffer?: ArrayBuffer) {
        if (buffer) {
            this.reader = new BinaryDataReader(buffer);
            this.deserialize(); 
        }
    }


    // Méthode deserialize pour être implémentée par les classes dérivées si nécessaire
    protected abstract deserialize(): void;

    protected readString(length: number | (() => number)): string {
        const resolvedLength = typeof length === 'function' ? length.call(this) : length;
        return this.reader.readString(resolvedLength);
    }

    protected readUint32(): number {
        return this.reader.readUint32();
    }
}
