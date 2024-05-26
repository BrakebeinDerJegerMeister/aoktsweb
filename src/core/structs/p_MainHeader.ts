import { arrayData, arrayOf, ascii, str, u32 } from "../factories/dataFactories";
import { SType } from "../types/SType";
import { U32 } from "../types/U32";


type MainHeaderMapValue<K extends keyof MainHeaderMapOptions> = MainHeaderMapOptions[K] | (() => MainHeaderMapOptions[K]);

export interface MainHeaderMap extends Map<string, SType<any> | (() => SType<any>)> {
  set<K extends keyof MainHeaderMapOptions>(key: K, value: MainHeaderMapValue<K>): this;
  get<K extends keyof MainHeaderMapOptions>(key: K): MainHeaderMapOptions[K];
}

interface MainHeaderMapOptions {
  version: SType<string>;
  headerLength: SType<number>;
  headerType: SType<number>;
  lastSaveTimestamp: SType<number>;
  instructions: SType<string>;
  individualVictories?: SType<number>;
  playerCount?: SType<number>;
  value1000?: SType<number>;
  gameEdition?: SType<number>;
  usedSetsCount?: SType<number>;
  usedSets?: SType<Array<any>>;
  creatorName?: SType<string>;
  triggerCount?: SType<number>;
  compressedData: SType<Uint8Array>;
}


export function p_MainHeader(o: MainHeaderMap, myData: any) {
  //console.log(myData)

  switch (myData.headerType) {
    case 2: p_MainHeader_v2(o, myData); break;
    case 3: p_MainHeader_v3(o, myData); break;
    case 5: p_MainHeader_v5(o, myData); break;
    case 6: p_MainHeader_v6(o, myData); break;
  }
}

function p_MainHeader_v2(o: MainHeaderMap, myData: any) {
  console.log("@@@ using p_MainHeader_v2 @@@");
  o.set("version", ascii(4));
  o.set("headerLength", u32());
  o.set("headerType", u32());
  o.set("lastSaveTimestamp", u32());
  o.set("instructions", str(u32()));
  o.set("individualVictories", u32());
  o.set("playerCount", u32());
  o.set("compressedData", arrayData(Infinity));
}

function p_MainHeader_v3(o: MainHeaderMap, myData: any) {
  console.log("@@@ using p_MainHeader_v3 @@@");
  o.set("version", ascii(4));
  o.set("headerLength", u32());
  o.set("headerType", u32());
  o.set("lastSaveTimestamp", u32());
  o.set("instructions", str(u32()));
  o.set("individualVictories", u32());
  o.set("playerCount", u32());
  o.set("value1000", u32());
  o.set("gameEdition", u32());
  o.set("usedSetsCount", u32());
  //console.log("@ p_MainHeader v3 : usedSetsCount", o.get("usedSetsCount"))
  o.set("usedSets", arrayOf(u32(), () => o.get("usedSetsCount")));
  o.set("compressedData", arrayData(Infinity));
}

function p_MainHeader_v5(o: MainHeaderMap, myData: any) {
  console.log("@@@ using p_MainHeader_v5 @@@");
  o.set("version", ascii(4));
  o.set("headerLength", u32());
  o.set("headerType", u32());
  o.set("lastSaveTimestamp", u32());
  o.set("instructions", str(u32()));
  o.set("individualVictories", u32());
  o.set("playerCount", u32());
  o.set("value1000", u32());
  o.set("gameEdition", u32());
  o.set("usedSetsCount", u32());
  //console.log("@ p_MainHeader v4 : usedSetsCount", o.get("usedSetsCount"))
  o.set("usedSets", arrayOf(u32(), () => o.get("usedSetsCount")));
  o.set("creatorName", str(u32()));
  o.set("triggerCount", u32());
  o.set("compressedData", arrayData(Infinity));
}

function p_MainHeader_v6(o: MainHeaderMap, myData: any) {
  console.log("@@@ using p_MainHeader_v6 @@@");
  o.set("version", ascii(4));
  o.set("headerLength", u32());
  o.set("headerType", u32());
  o.set("lastSaveTimestamp", u32());
  o.set("instructions", str(u32()));
  o.set("playerCount", u32());
  o.set("value1000", u32());
  o.set("gameEdition", u32());
  o.set("usedSetsCount", u32());
  //console.log("@ p_MainHeader v4 : usedSetsCount", o.get("usedSetsCount"))
  o.set("usedSets", arrayOf(u32(), () => o.get("usedSetsCount")));
  o.set("creatorName", str(u32()));
  o.set("triggerCount", u32());
  o.set("compressedData", arrayData(Infinity));
}