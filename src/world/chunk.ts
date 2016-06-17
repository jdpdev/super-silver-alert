import {ILinkable} from "../util/linked-list"

export abstract class Chunk implements ILinkable {

	protected _container: Phaser.Group = null;

	// Chunk chain (linked list of live chunks)
	protected _previous: Chunk = null;
	protected _next: Chunk = null;

	constructor(protected _game: Phaser.Game, parent:PIXI.DisplayObjectContainer, protected _data: any) {
		this._container = _game.add.group(parent);
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

	abstract draw();

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