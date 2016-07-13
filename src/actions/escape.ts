import {GameManager} from "../states/game-manager";
import {Action} from "./action";
import {IDoorAction} from "./door";
import {ConnectionDef} from "../world/blueprint-factory"
import {TimeRestriction} from "./components/time-restrict"

export class EscapeAction extends Action implements IDoorAction {
	
	constructor(manager: GameManager, label: string, protected _connection: ConnectionDef) {
		super(manager, label);

		if (_connection.openTime != null && _connection.closeTime != null) {
			this.addRestriction(new TimeRestriction(_connection.openTime, _connection.closeTime));
		}
	}

	/** How loud the escape is on activation */
	get noiseLevel(): number {
		return 0;
	}

	/** @type {number} Id of the item that can unlock the door, if applicable */
	get keyId(): number {
		return null;
	}

	get isLocked(): boolean {
		var restriction = this.isRestricted();
		return restriction !== false;
	}
}