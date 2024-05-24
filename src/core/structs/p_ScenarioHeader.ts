import { arrayData, arrayOf, ascii, f32, section, str, u16, u32, u8 } from "../factories/dataFactories";
import { p_PlayerData1 } from "./p_PlayerData1";

export function p_ScenarioHeader(o: Map<string, any>) {
    o.set("nextUnitID", u32());
    o.set("version", f32());
    /*o.set("playerNames", arrayOf(ascii(256),16));
    o.set("strTablePlayerNames", arrayOf(u32(),16));   
    o.set("playerData1", arrayOf(section(p_PlayerData1), 16));
    o.set("conquestMode", u8());
    o.set("missionItemsCounter", u16());
    o.set("missionAvailable", u16());
    o.set("missionTimeline", f32());
    o.set("missionItem", arrayOf(arrayData(30),()=>{ return  o.get("missionItemsCounter"); }));
    o.set("originalFilename", str(u16()));*/
}
