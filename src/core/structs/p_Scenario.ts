import { section } from "../factories/dataFactories";
import { p_MainHeader } from "./p_MainHeader";
import { p_ScenarioHeader } from "./p_ScenarioHeader";

export function p_Scenario(o: Map<string, any>) {
    o.set("useMainDataView", null);
    o.set("mainHeader", section(p_MainHeader));
    o.set("useScenarioDataView", null);
    o.set("scenarioHeader", section(p_ScenarioHeader))
}