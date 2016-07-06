import {GameManager} from "../states/game-manager";
import {Action} from "./action"

export class Teleport extends Action {

	constructor(manager: GameManager, label: string, private _id: number) {
		super(manager, label);
	}

	/**
	 * Teleport to a new chunk
	 */
	performAction() {
		this._manager.teleportToChunk(this._id);
	}

	get icon(): PIXI.DisplayObject {
		return null;
	}

	get label(): string {
		return this._label;
	}
}