import { u32 } from "../factories/dataFactories";

export function p_PlayerData1(o: Map<string, any>, myData:any) {
    o.set("isActive", u32());
    o.set("isHuman", u32());
    o.set("civilization", u32());
    o.set("ctyMode", u32());
}