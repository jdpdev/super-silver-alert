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

		var isLeftJustDown: boolean = this._leftKey.justDown;
		var isRightJustDown: boolean = this._rightKey.justDown;
		var isUpJustDown: boolean = this._upKey.justDown;
		var isDownJustDown: boolean = this._downKey.justDown;

		// Revert lockout
		if (isLeftJustDown || isRightJustDown || isUpJustDown || isDownJustDown) {
			this._transitionLockout = false;
		}

		// Check for zone transition
		// TODO Require holding the button for some time
		var connections = (<Player>this._actor).connections;

		if (connections) {
			

			//console.log(this._transitionLockout + ", " + isLeftJustDown + ", " + (isLeftJustDown === true));
			//console.log(connections.left != null && isLeftJustDown === true && this._transitionLockout === false);

			// Do actions
			if (connections.left && isLeftJustDown && !this._transitionLockout) {
				connections.left.performAction();
				return;
			} else if (connections.right && isRightJustDown && !this._transitionLockout) {
				connections.right.performAction();
				return;
			} else if (connections.up && isUpJustDown && !this._transitionLockout) {
				connections.up.performAction();
				return;
			} else if (connections.down && isDownJustDown && !this._transitionLockout) {
				connections.down.performAction();
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

	sceneTransitioned() {
		console.log("sceneTransition");
		this._transitionLockout = true;
	}
}