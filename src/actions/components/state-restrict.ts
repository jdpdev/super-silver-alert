import {Restriction, RestrictionDef, RestrictionResponse} from "./restriction"
import {GameManager} from "../../states/game-manager"
import {StateManager} from "../../fsm/state-manager"

class StateRestrictionDef extends RestrictionDef {
    /** The id of the state tree */
    tree: string;

    /** The id of the state the tree must be in */
    state: string;
}

export class StateRestriction extends Restriction {
    constructor(private _def) {
        super();
    }

    protected get def(): StateRestrictionDef {
        return this._def;
    }

    isRestricted(manager: GameManager): RestrictionResponse {
        var tree = StateManager.getTree(this.def.tree);
        
        if (tree.isInState(this.def.state)) {
            return new RestrictionResponse(this.def.tree, false, "");
        } else {
            return new RestrictionResponse(this.def.tree, true, "");
        }
    }
}