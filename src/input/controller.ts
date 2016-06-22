import {Actor} from "../world/actor";

/**
 * Base actor controller
 */
export class Controller {
	protected _actor: Actor = null;

	assignActor(actor:Actor) {
		this._actor = actor;
	}
}