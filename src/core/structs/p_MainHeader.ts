import { arrayData, arrayOf, ascii, str, u32 } from "../factories/dataFactories";

export function p_MainHeader(o: Map<string, any>, myData: object) {
  console.log(myData)
  switch(myData.headerType) {
    case 2: return p_MainHeader_v2(o);
    case 3: return p_MainHeader_v3(o);
    case 5: return p_MainHeader_v5(o);
    case 6: return p_MainHeader_v6(o);
  }
}

function p_MainHeader_v2(o: Map<string, any>) {
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

function p_MainHeader_v3(o: Map<string, any>) {
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

function p_MainHeader_v5(o: Map<string, any>) {
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

function p_MainHeader_v6(o: Map<string, any>) {
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