import {GameManager} from "../states/game-manager";
import {Action, ActionResponse} from "./action"
import {IDoorAction} from "./door"
import {ConnectionDef} from "../world/blueprint-factory"
import {Player} from "../world/actors/player"

export class Teleport extends Action implements IDoorAction {

	constructor(manager: GameManager, label: string, protected _connection: ConnectionDef) {
		super(manager, label);
	}

	/**
	 * Teleport to a new chunk
	 */
	performAction(instigator: Player): Promise<ActionResponse> {
		return new Promise<ActionResponse>((resolve, reject) => {
			if (this._manager.teleportToChunk(this._connection.chunkId)) {
				resolve(new ActionResponse(true));
			} else {
				reject(new ActionResponse(false));
			}
		});
	}

	/** @type {boolean} Is the door is locked? */
	get isLocked(): boolean {
		return false;
	}

	/** @type {number} Id of the item that can unlock the door, if applicable */
	get keyId(): number {
		return null;
	}

	get icon(): PIXI.DisplayObject {
		return null;
	}

	get label(): string {
		return this._label;
	}
}