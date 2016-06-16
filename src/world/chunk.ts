import {ILinkable} from "../util/linked-list"

export class Chunk implements ILinkable {

	protected _container: Phaser.Group = null;
	private _backWall: Phaser.Graphics = null;
	private _ceiling: Phaser.Graphics = null;
	private _floor: Phaser.Graphics = null;

	// Chunk chain (linked list of live chunks)
	protected _previous: Chunk = null;
	protected _next: Chunk = null;

	constructor(game: Phaser.Game, parent:PIXI.DisplayObjectContainer, data: any) {
		this._container = game.add.group(parent);

		this._backWall = game.add.graphics(0, 200, this._container);
		this._backWall.beginFill(0xb7bab7);
		this._backWall.drawRect(0, 0, 400, 200);
		this._backWall.endFill();

		this._backWall.beginFill(<number>data);
		this._backWall.drawRect(0, 150, 400, 25);
		this._backWall.endFill();

		this._ceiling = game.add.graphics(0, 150, this._container);
		this._ceiling.beginFill(0x777a77);
		this._ceiling.drawRect(0, 0, 400, 50);
		this._ceiling.endFill();

		this._floor = game.add.graphics(0, 400, this._container);
		this._floor.beginFill(0xe7eae7);
		this._floor.drawRect(0, 0, 400, 40);
		this._floor.endFill();
	}

	get bounds():PIXI.Rectangle {
		return this._container.getBounds();
	}

	get x(): number {
		return this._container.x;
	}

	get y(): number {
		return this._container.y;
	}

	/**
	 * Sets the position of the chunk relative to its parent.
	 * @param {number} x X-position
	 * @param {number} y Y-position
	 */
	setPosition(x:number, y:number) {
		this._container.x = x;
		this._container.y = y;
	}

	/**
	 * Remove the chunk from display
	 */
	remove() {
		this._container.destroy(true);
		this._previous = null;
		this._next = null;
	}

// ***************************************************************************************************************
// 	Linking Chunks
// ***************************************************************************************************************

	get previous(): Chunk {
		return this._previous;
	}

	set previous(value: Chunk) {
		this._previous = value;
	}

	get next(): Chunk {
		return this._next;
	}

	set next(value: Chunk) {
		this._next = value;
	}
}