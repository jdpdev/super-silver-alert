import {Controller} from "./controller";
import {Player} from "../world/actors/player";
import {GameManager} from "../states/game-manager";
import {Corridor} from "../world/blueprints";

/**
 * Base actor controller
 */
export class AIController extends Controller {

	/** @type {number} Id of the corridor the AI is in */
	protected _currentCorridor: number  = -1;

	protected _moveDirection: number = 0;

	/** @type {number} Id of the corridor the AI is in */
	get location(): number {
		return this._currentCorridor;
	}

	constructor(state:GameManager, corridorId: number) {
		super(state);
		this._currentCorridor = corridorId;
	}

	assignActor(actor:Player) {
		if (this._actor != null) {
			this._actor.onMoveBlocked.remove(this.moveBlocked, this);
		}

		this._actor = actor;
		this._actor.onMoveBlocked.add(this.moveBlocked, this);
	}

	spawn() {
		this._moveDirection = Math.random() >= 0.5 ? 1 : -1;
		this._actor.move(this._moveDirection);
	}

	/**
	 * Update every tick
	 * @param {number} delta Time elapsed since last tick
	 */
	update(delta: number) {

	}

	protected moveBlocked(currentX: number, desiredX: number) {
		this._moveDirection *= -1;
		this._actor.move(this._moveDirection);
	}
}