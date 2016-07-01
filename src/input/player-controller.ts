import {Controller} from "./controller";
import {GameManager} from "../states/game-manager";
import {Actor} from "../world/actor";
import {Player} from "../world/actors/player";

export class PlayerController extends Controller {

	private _leftKey: Phaser.Key = null;
	private _rightKey: Phaser.Key = null;
	private _upKey: Phaser.Key = null;
	private _downKey: Phaser.Key = null;

	private _transitionLockout: boolean = false;
	
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

		/*if (this._transitionLockout) {
			if (this._leftKey.duration == 0 && this._rightKey.duration == 0 && this._upKey.duration == 0 && this._downKey.duration == 0) {
				this._transitionLockout = false;
			} else {
				return;
			}
		}*/

		// Check for zone transition
		// TODO Require holding the button for some time
		var connections = (<Player>this._actor).connections;

		if (connections) {
			if (connections.left && this._leftKey.isDown) {
				connections.left.performAction();
				this._transitionLockout = true;
				return;
			} else if (connections.right && this._rightKey.isDown) {
				connections.right.performAction();
				this._transitionLockout = true;
				return;
			} else if (connections.up && this._upKey.isDown) {
				connections.up.performAction();
				this._transitionLockout = true;
				return;
			} else if (connections.down && this._downKey.isDown) {
				connections.down.performAction();
				this._transitionLockout = true;
				return;
			}
		}

		//console.log("left >> " + this._leftKey.isDown + "; right >> " + this._rightKey.isDown);

		// Move
		var direction = 0;

		if (this._leftKey.isDown) {
			direction = -1;
		} else if (this._rightKey.isDown) {
			direction = 1;
		}

		if (direction == 0) {
			return;
		}

		this._actor.translate(delta * 150 * direction, 0);
	}
}