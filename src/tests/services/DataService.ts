// services/DataService.ts
import { UncompressedHeader } from '../models/UncompressedHeader';

export class DataService {
    static loadHeader(buffer: ArrayBuffer): UncompressedHeader {
        return new UncompressedHeader(buffer);
    }

    static saveHeader(header: UncompressedHeader): ArrayBuffer | null{
        return header.toArrayBuffer();
    }

    // Ajouter des méthodes pour charger et sauvegarder d'autres parties des données
}
