interface IHeader_v2 {
    version: Ascii;
    headerLength: U32;
    headerType: U32;
    lastSaveTimestamp : U32;
    instructions: Str<U32>;
    individualVictories: U32;
    playerCount: U32;
    compressedData : ArrayData;
}