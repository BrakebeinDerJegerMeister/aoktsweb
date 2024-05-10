// models/UncompressedHeader.ts

import { BinaryDataUtils } from '../utils/BinaryDataUtils';

export class UncompressedHeader  extends BinaryDataUtils {
    version: string = "1.0";
    headerLength: number = 32;
    creatorName: string = "Default Creator";
    date: number = Math.floor(Date.now() / 1000);
    numberOfDLC: number = 0;
    dlcArray: number[] = [];

    constructor(buffer?: ArrayBuffer) {
        super(buffer);  // Appelle le constructeur de la classe de base
        // Ajouter ici des initialisations spécifiques à UncompressedHeader
        // qui ne dépendent pas de la présence d'un ArrayBuffer
        this.setDefaultValues();
    }

    setDefaultValues() {
        this.version = "1.0";
        this.headerLength = 32;
        this.creatorName = "Default Creator";
        this.date = Math.floor(Date.now() / 1000);
        this.numberOfDLC = 0;
        this.dlcArray = [];
    }
    
    private calculateNameLength(): number {
        // Ici, une logique pour déterminer la longueur du nom, si nécessaire
        return 20;
    }

    deserialize() {
        this.version = this.readString(4);
        this.headerLength = this.readUint32();
        this.creatorName = this.readString(() => this.calculateNameLength());
        this.date = this.readUint32();
        this.numberOfDLC = this.readUint32();
        this.dlcArray = new Array(this.numberOfDLC).fill(0).map(() => this.readUint32());
    }
}
