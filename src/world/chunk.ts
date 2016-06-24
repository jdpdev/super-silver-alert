import {ILinkable} from "../util/linked-list"
import {WorldObject} from "./world-object"

export type ChunkConnections = { up: number, down: number, left: number, right: number };

export abstract class Chunk extends WorldObject implements ILinkable {

	// Chunk chain (linked list of live chunks)
	protected _previous: Chunk = null;
	protected _next: Chunk = null;

	protected _leftLimitX: number = 0;
	protected _rightLimitX: number = 0;

	protected _width: number = 0;

	constructor(_game: Phaser.Game, _parent: Phaser.Group, protected _id: number, protected _data: any) {
		super(_game, _parent);
	}

	get id(): number { return this._id; }

	get width(): number { return this._width; }

	remove() {
		super.remove();

		if (this._previous) {
			this._previous.next = this._next;
		}

		if (this._next) {
			this._next.previous = this._previous;
		}

		this._previous = null;
		this._next = null;
	}

	/**
	 * Whether movement is allowed to a given position
	 * @param  {number}  x The horizontal position in world space
	 * @return {boolean}   Whether movement is allowed
	 */
	allowMove(x: number):boolean {
		x -= this.x;
		return this._leftLimitX <= x && x <= this._rightLimitX;
	}

	/**
	 * Returns if a horizontal position is a warp zone, and to what
	 * @param {number} x The horizontal position
	 */
	getConnections(x: number): ChunkConnections {
		var dirs = {up: null, down: null, left: null, right: null};

		x -= this.x;

		if (this._data.connect) {
			if (this._data.connect.left && this.isInLeftConnection(x)) {
				dirs.left = this._data.connect.left.id;
			}

			if (this._data.connect.right && this.isInRightConnection(x)) {
				dirs.right = this._data.connect.right.id;
			}

			if (this._data.connect.up && this.isInUpConnection(x)) {
				dirs.up = this._data.connect.up.id;
			}

			if (this._data.connect.down && this.isInDownConnection(x)) {
				dirs.down = this._data.connect.down.id;
			}
		}

		return dirs;
	}

	protected isInUpConnection(x: number): boolean {
		return false;
	}

	protected isInDownConnection(x: number): boolean {
		return false;
	}

	protected isInLeftConnection(x: number): boolean {
		return false;
	}

	protected isInRightConnection(x: number): boolean {
		return false;
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