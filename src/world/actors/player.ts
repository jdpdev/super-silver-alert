import {Actor} from "../actor";
import {Chunk, ChunkConnections} from "../chunk";

export class Player extends Actor {

	protected _actions: ChunkConnections;

	private _leftFootSprite: Phaser.Sprite;
	private _rightFootSprite: Phaser.Sprite;

	get connections(): ChunkConnections {
		return this._actions;
	}

	draw() {
		this._graphics = this._game.add.graphics(0, 0, this._game.world);

		// shadow
		this._graphics.beginFill(0x000000, 0.4);
		this._graphics.drawRect(-30, 3, 60, 12);
		this._graphics.endFill();

		// Body
		this._graphics.beginFill(0x6b8e23);
		this._graphics.drawRect(-30, -40, 60, 40);
		this._graphics.drawRect(-35, -30, 5, 10);
		this._graphics.endFill();

		// head
		this._graphics.beginFill(0xfbdcbd);
		this._graphics.drawRect(-25, -50, 40, 30);
		this._graphics.drawRect(-40, -30, 5, 10);
		this._graphics.endFill();

		// hair
		this._graphics.beginFill(0xd7d7d7);
		this._graphics.drawRect(10, -45, 15, 10);
		this._graphics.endFill();

		// face
		// ...eyes
		this._graphics.beginFill(0xffffff);
		this._graphics.drawRect(-20, -35, 10, 5);
		this._graphics.drawRect(-5, -35, 10, 5);
		this._graphics.endFill();

		this._graphics.beginFill(0x87ceeb);
		this._graphics.drawRect(-20, -35, 5, 5);
		this._graphics.drawRect(-5, -35, 5, 5);
		this._graphics.endFill();

		// ...mouth
		this._graphics.beginFill(0x8a6643, 0.5);
		this._graphics.drawRect(-20, -25, 25, 2);
		this._graphics.drawRect(-20, -23, 2, 2);
		this._graphics.drawRect(3, -23, 2, 2);
		this._graphics.endFill();

		// cane
		this._graphics.beginFill(0xa16e2c);
		this._graphics.drawRect(-40, -25, 5, 35);
		this._graphics.endFill();

		// feet
		/*this._graphics.beginFill(0x303030);
		this._graphics.drawRect(-20, 0, 10, 5);
		this._graphics.drawRect(-25, 5, 15, 5);

		this._graphics.drawRect(15, 0, 10, 5);
		this._graphics.drawRect(10, 5, 15, 5);
		this._graphics.endFill();*/

		this._sprite = this._game.add.sprite(-30, -60, null, null, this._container);
		this._sprite.texture = this._graphics.generateTexture();

		this._graphics.clear();

		// left foot
		this._graphics.beginFill(0x303030);
		this._graphics.drawRect(-20, 0, 10, 5);
		this._graphics.drawRect(-25, 5, 15, 5);
		this._graphics.endFill();

		this._leftFootSprite = this._game.add.sprite(-30, -60, null, null, this._container);
		this._leftFootSprite.texture = this._graphics.generateTexture();

		/*this._graphics.clear();

		// right foot
		this._graphics.beginFill(0x303030);
		this._graphics.drawRect(-20, 0, 10, 5);
		this._graphics.drawRect(-25, 5, 15, 5);
		this._graphics.endFill();*/

		this._rightFootSprite = this._game.add.sprite(0, -60, null, null, this._container);
		this._rightFootSprite.texture = this._graphics.generateTexture();

		this._game.world.remove(this._graphics, true);
	}

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	translate(dx: number, dy: number): Chunk {
		var chunk = super.translate(dx, dy);
		this._actions = chunk.getActions(this.x);

		return chunk;
	}

	/**
	 * Set the chunk connections for the current location
	 * @return {number} [description]
	 */
	getLocationConnections() {
		this._actions = this.getLocationChunk(this.x).getActions(this.x);
	}
}