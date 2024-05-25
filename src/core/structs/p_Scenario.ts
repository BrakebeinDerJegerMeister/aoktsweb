import { section } from "../factories/dataFactories";
import { p_MainHeader } from "./p_MainHeader";
import { p_ScenarioHeader } from "./p_ScenarioHeader";

export function p_Scenario(o: Map<string, any>, myData:any) {
    o.set("useMainDataView", myData);
    o.set("mainHeader", section(p_MainHeader, myData));
    o.set("useScenarioDataView", myData);
    o.set("readFloatVersion", myData);
    o.set("scenarioHeader", section(p_ScenarioHeader, myData))
}