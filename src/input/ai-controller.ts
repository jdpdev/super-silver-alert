import {Actor} from "../world/actor";
import {GameManager} from "../states/game-manager";
import {Corridor} from "../world/blueprints";

/**
 * Base actor controller
 */
export class AIController {
	protected _actor: Actor = null;

	/** @type {number} Id of the corridor the AI is in */
	protected _currentCorridor: number  = -1;

	/** @type {number} Id of the corridor the AI is in */
	get location(): number {
		return this._currentCorridor;
	}

	constructor(protected _state:GameManager, corridorId: number) {
		this._currentCorridor = corridorId;
	}

	assignActor(actor:Actor) {
		this._actor = actor;
	}

	/**
	 * Update every tick
	 * @param {number} delta Time elapsed since last tick
	 */
	update(delta: number) {

	}
}