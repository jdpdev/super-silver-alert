import {Actor} from "../world/actor";
import {GameManager} from "../states/game-manager";

/**
 * Base actor controller
 */
export class Controller {
	protected _actor: Actor = null;

	constructor(protected _state:GameManager) {

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