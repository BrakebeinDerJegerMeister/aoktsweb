import { f32, u32 } from "../factories/dataFactories";

export function p_ScenarioHeader(o: Map<string, any>) {
    o.set("nextUnitID", u32());
    o.set("version", f32());
}
