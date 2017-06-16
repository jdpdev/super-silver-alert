import {GameManager} from "../states/game-manager";
import {Action, ActionResponse} from "./action";
import {IDoorAction} from "./door";
import {ConnectionDef} from "../world/blueprint-factory"   
import {Chunk} from "../world/chunk"   
import {TimeRestriction} from "./components/time-restrict"
import {Player} from "../world/actors/player"

export class EscapeAction extends Action implements IDoorAction {
	
	constructor(manager: GameManager, label: string, protected _chunk: Chunk, protected _connection: ConnectionDef) {
		super(manager, label, null);

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

	/**
	 * Attempt to escape
	 */
	performAction(instigator: Player): Promise<ActionResponse> {
		return new Promise((resolve, reject) => {
			if (this.isLocked) {
				reject(new ActionResponse(false, `This door is locked from ${this._connection.closeTime} to ${this._connection.openTime}`));
			} else {
				super.performAction(instigator);
				this._manager.escapeAttempt(this);

				resolve(new ActionResponse(true));
			}
		});
	}
}