import { section } from "../../utils/dataFactories";
import { p_ScenarioHeader } from "./p_ScenarioHeader";

export function p_Scenario(o: Map<string, any>, myData:any) {

    o.set("scenarioHeader", section(p_ScenarioHeader, myData));
}