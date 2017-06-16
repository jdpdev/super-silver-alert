import {Restriction, RestrictionDef} from "./restriction"
import {StateRestriction} from "./state-restrict"

export class RestrictionFactory {
    static getRestriction(def: RestrictionDef): Restriction {
        // TODO do via decorators
        switch (def.type) {
            default:    return null;
            case "state":   return new StateRestriction(def);
        }
    }
}