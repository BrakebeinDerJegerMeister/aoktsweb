import { ascii, u32, str, arrayOf, arrayData } from "../types";

export class UncompressedHeader {
    version: typeof ascii;
    headerLength: typeof u32;
    headerType: typeof u32;
    lastSaveTimestamp: typeof u32;
    instructions: typeof str;
    individualVictories: typeof u32;
    playerCount: typeof u32;
    value1000: typeof u32;
    gameEdition: typeof u32;
    usedSetsCount: typeof u32;
    usedSets: typeof arrayOf;
    creatorName: typeof str;
    triggerCount: typeof u32;
    compressedData: typeof arrayData;
    constructor(data: any, currentScenario: any) {
        let use1 = { "use": () => data.version < 1.40 }
        let use2 = { "use": () => data.ext == "aoe2scenario" }
        let use3 = { "use": () => use2.use() && data.version >= 1.35 }

        this.version = ascii(4);
        this.headerLength = u32();
        this.headerType = u32();
        this.lastSaveTimestamp = u32();
        this.instructions = str(u32());
        this.individualVictories = u32(use1);
        this.playerCount = u32();
        this.value1000 = u32(use2);
        this.gameEdition = u32(use2);
        this.usedSetsCount = u32(use2);
        this.usedSets = arrayOf(u32(), () => currentScenario.uncompressedHeader.usedSetsCount.value, use2);
        this.creatorName = str(u32(), use3);
        this.triggerCount = u32(use3);
        this.compressedData = arrayData(Infinity);
    }
}