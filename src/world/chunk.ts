import {ILinkable} from "../util/linked-list"
import {WorldObject} from "./world-object"
import {Action} from "../actions/action"
import {Teleport} from "../actions/teleport"

export type ChunkConnections = { up: Action, down: Action, left: Action, right: Action };

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
	 * Returns the actions available from the chunk at a given position
	 * @param {number} x The horizontal position
	 */
	getActions(x: number): ChunkConnections {
		var dirs = {up: null, down: null, left: null, right: null};

		x -= this.x;

		// teleport actions
		if (this._data.connect) {
			if (this._data.connect.left && this.isInLeftConnection(x)) {
				dirs.left = new Teleport(this.manager, "Walk", this._data.connect.left >= 0 ? this._data.connect.left.id : -1);
			}

			if (this._data.connect.right && this.isInRightConnection(x)) {
				dirs.right = new Teleport(this.manager, "Walk", this._data.connect.right >= 0 ? this._data.connect.right.id : -1);
			}

			if (this._data.connect.up && this.isInUpConnection(x)) {
				dirs.up = new Teleport(this.manager, "Walk", this._data.connect.up >= 0 ? this._data.connect.up.id : -1);
			}

			if (this._data.connect.down && this.isInDownConnection(x)) {
				dirs.down = new Teleport(this.manager, "Walk", this._data.connect.down >= 0 ? this._data.connect.down.id : -1);
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