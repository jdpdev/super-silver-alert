import {WorldObject} from "./world-object";
import {Chunk} from "./chunk";
import {Controller} from "../input/controller";
import {GameManager} from "../states/game-manager";

export class Actor extends WorldObject {

	protected _controller: Controller = null;

	protected _sprite: Phaser.Sprite;
	protected _graphics: Phaser.Graphics;
	//protected _state: GameManager;
	
	/** 
	 * Called when the actor attempts to move to a location it is not allowed.
	 * Two parameters are sent: the x position before the move, and the desired move position.
	 */
	public onMoveBlocked: Phaser.Signal = new Phaser.Signal();

	constructor(_game: Phaser.Game, _parent: Phaser.Group, protected _state:GameManager) {
		super(_game, _parent);

		if (this._container) {
			this.draw(); 
		}
	}

	/**
	 * Update every tick
	 * @param {number} delta Time elapsed since last tick
	 */
	update(delta: number) {
		this._controller.update(delta);
	}

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	protected translate(dx: number, dy: number): Chunk {
		var nextX = this._container.x + dx;
		var chunk = this.getLocationChunk(nextX);

		if (chunk == null) {
			return;
		}

		if (chunk.allowMove(nextX)) {
			this._container.x += dx;
		} else {
			this.onMoveBlocked.dispatch(this._container.x, this._container.x + dx);
		}
		
		this._container.y += dy;

		return chunk;
	}

	getLocationChunk(x: number): Chunk {
		return this._state.getLocationChunk(x);
	}

	draw() {
		
	}

	setCameraFocus(camera: Phaser.Camera) {
		camera.focusOn(this._container);
		camera.follow(this._sprite, null, 0.1);
	}
}