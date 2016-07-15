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

	protected _orderResolve: (value: boolean) => void;

	protected _orderTargetX: number = null;

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
		if (this._orderTargetX != null) {

		}
	}

	protected moveBlocked(currentX: number, desiredX: number) {
		this._moveDirection *= -1;
		this._actor.move(this._moveDirection);
	}

	orderTo(x: number): Promise<boolean> {
		return new Promise<boolean>(
			(resolve, reject) => {
				if (x == this._actor.x) {
					resolve(true);
				} else {
					this._orderResolve = resolve;
					this._orderTargetX = x;

					this._actor.move(x - this._actor.x > 0 ? 1 : -1);
					this._actor.setTargetPosition(x, 
						(success: boolean) => {
							resolve(success);
						}
					);
				}
			}
		);
	}
}