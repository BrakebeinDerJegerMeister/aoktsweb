// models/UncompressedHeader.ts

import { BinaryDataUtils } from '../utils/BinaryDataUtils';




export class Scenario extends BinaryDataUtils {

    uncompressedHeader: UncompressedHeader = new UncompressedHeader("UintArray1");
    gameHeader: GameHeader = new GameHeader("uncompressedHeader.UintArray2");
    bitmap: Bitmap = new Bitmap("uncompressedHeader.UintArray2");

    protected deserialize(): void {
        
    }
}

export class UncompressedHeader  extends BinaryDataUtils {
    version: string = "1.0";
    headerLength: number = 32;
    creatorName: string = "Default Creator";
    date: number = Math.floor(Date.now() / 1000);
    numberOfDLC: number = 0;
    dlcArray: number[] = [];

    compressedData: Uint8Array = new Uint8Array();


    constructor(buffer?: ArrayBuffer) {
        super(buffer);  // Appelle le constructeur de la classe de base
    }

    private calculateNameLength(): number {
        // Ici, une logique pour déterminer la longueur du nom, si nécessaire
        return 20;
    }

    protected deserialize(): void {
        this.version = this.readString(4);
        this.headerLength = this.readUint32();
        this.creatorName = this.readString(() => this.calculateNameLength());
        this.date = this.readUint32();
        this.numberOfDLC = this.readUint32();
        this.dlcArray = new Array(this.numberOfDLC).fill(0).map(() => this.readUint32());
    }
}

export class GameHeader extends BinaryDataUtils {
    version: number = 1.122456647788;

    protected deserialize(): void {
        
    }
}

export class Bitmap extends BinaryDataUtils {
    constructor() {
        super();
        this.a = 32;
        this.b = 44;
    }
    protected deserialize(): void {
        
    }
}