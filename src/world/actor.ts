import {WorldObject} from "./world-object";
import {Chunk} from "./chunk";
import {Controller} from "../input/controller";
import {GameManager} from "../states/game-manager";

export class Actor extends WorldObject {

	protected _controller: Controller = null;

	protected _sprite: Phaser.Sprite;
	protected _graphics: Phaser.Graphics;

	constructor(_game: Phaser.Game, _parent: Phaser.Group, protected _state:GameManager) {
		super(_game, _parent);

		this.draw();
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
	translate(dx: number, dy: number): Chunk {
		var nextX = this._container.x + dx;
		var chunk = this._state.getLocationChunk(nextX);

		if (chunk == null) {
			return;
		}

		if (chunk.allowMove(nextX)) {
			this._container.x += dx;
		}
		
		this._container.y += dy;

		return chunk;
	}

	draw() {
		this._graphics = this._game.add.graphics(0, 0, this._game.world);

		this._graphics.beginFill(0xffaaaa);
		this._graphics.drawRect(-30, -40, 60, 40);
		this._graphics.drawRect(-40, -60, 50, 30);
		this._graphics.endFill();

		this._sprite = this._game.add.sprite(-30, -60, null, null, this._container);
		this._sprite.texture = this._graphics.generateTexture();

		this._game.world.remove(this._graphics, true);
	}

	setController(controller: Controller) {
		this._controller = controller;
		controller.assignActor(this);
	}

	setCameraFocus(camera: Phaser.Camera) {
		camera.focusOn(this._container);
		camera.follow(this._sprite, null, 0.1);
	}
}