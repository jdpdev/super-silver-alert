import {Controller} from "./controller";
import {GameManager} from "../states/game-manager";
import {Actor} from "../world/actor";
import {Player} from "../world/actors/player";
import {Action} from "../actions/action"

export class PlayerController extends Controller {

	private _leftKey: Phaser.Key = null;
	private _rightKey: Phaser.Key = null;
	private _upKey: Phaser.Key = null;
	private _downKey: Phaser.Key = null;

	/** @type {boolean} Lockout imposed by scene transition */
	private _transitionLockout: boolean = false;

	/** @type {boolean} Lockout imposed by game state */
	private _controlLockout: boolean = false;
	
	constructor(state: GameManager, input: Phaser.Input) {
		super(state);

		this._leftKey = input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this._rightKey = input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this._upKey = input.keyboard.addKey(Phaser.Keyboard.UP);
		this._downKey = input.keyboard.addKey(Phaser.Keyboard.DOWN);
	}

	/**
	 * Update every tick
	 * @param {number} delta Time elapsed since last tick
	 */
	update(delta: number) {

		var isLeftJustDown: boolean = this._leftKey.justDown;
		var isRightJustDown: boolean = this._rightKey.justDown;
		var isUpJustDown: boolean = this._upKey.justDown;
		var isDownJustDown: boolean = this._downKey.justDown;

		// Revert lockout
		if (isLeftJustDown || isRightJustDown || isUpJustDown || isDownJustDown) {
			this._transitionLockout = false;
		}

		if (this._controlLockout) {
			return;
		}

		// Check for zone transition
		// TODO Require holding the button for some time
		var connections = (<Player>this._actor).connections;

		if (connections != null) {
			

			//console.log(this._transitionLockout + ", " + isLeftJustDown + ", " + (isLeftJustDown === true));
			//console.log(connections.left != null && isLeftJustDown === true && this._transitionLockout === false);

			// Do actions
			if (connections.left && isLeftJustDown && !this._transitionLockout) {
				this.performAction(connections.left);
				return;
			} else if (connections.right && isRightJustDown && !this._transitionLockout) {
				this.performAction(connections.right);
				return;
			} else if (connections.up && isUpJustDown && !this._transitionLockout) {
				this.performAction(connections.up);
				return;
			} else if (connections.down && isDownJustDown && !this._transitionLockout) {
				this.performAction(connections.down);
				return;
			}
		}

		// Move
		var direction = 0;

		if (this._leftKey.isDown) {
			direction = -1;
		} else if (this._rightKey.isDown) {
			direction = 1;
		}

		if (!this._transitionLockout) {
			this._actor.move(direction);
		}
	}

	private performAction(action: Action | Action[]) {
		var target:Action = null;

		if (Array.isArray(action)) {

			// TODO Pick from multiple actions
			if (action.length == 1) {
				target = action[0];
			} else {
				target = action[0];
			}
		} else {
			target = action;
		}

		target.performAction(this._actor);
	}

	sceneTransitioned() {
		console.log("sceneTransition");
		this._transitionLockout = true;
	}

	controlLockout(lock: boolean) {
		this._controlLockout = lock;
	}
}