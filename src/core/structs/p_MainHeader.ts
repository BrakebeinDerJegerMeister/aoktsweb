import { arrayData, arrayOf, ascii, str, u32 } from "../factories/dataFactories";

export function p_MainHeader(o: Map<string, any>) {
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
  console.log("@ p_MainHeader : usedSetsCount", o.get("usedSetsCount"))
  o.set("usedSets", arrayOf(u32(), () => o.get("usedSetsCount")));
  o.set("compressedData", arrayData(Infinity));
}