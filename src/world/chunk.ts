import {ILinkable} from "../util/linked-list"
import {WorldObject} from "./world-object"
import {Item} from "./items/item"
import {Action} from "../actions/action"
import {Teleport} from "../actions/teleport"
import {GameManager} from "../states/game-manager"

export type ChunkConnections = { up: Action, down: Action, left: Action, right: Action };

export abstract class Chunk extends WorldObject implements ILinkable {

	protected _manager: GameManager = null;

	protected _data: any = null;

	// Chunk chain (linked list of live chunks)
	protected _previous: Chunk = null;
	protected _next: Chunk = null;

	protected _leftLimitX: number = 0;
	protected _rightLimitX: number = 0;

	protected _width: number = 0;

	/** @type {Item[]} Items within the chunk */
	protected _items: Item[] = [];

	protected _actions: Action[] = [];

	constructor(_game: Phaser.Game, _parent: Phaser.Group, protected _id: number, data: any) {
		super(_game, _parent);

		this._data = data;
		this._manager = <GameManager>_game.state.getCurrentState();
	}

	get id(): number { return this._id; }

	get width(): number { return this._width; }

	initialize() { }

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

	addAction(action: Action) {
		this._actions.push(action);
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

		for (var i = 0; i < this._actions.length; i++) {
			if (this._actions[i].checkBounds(x)) {
				if (!dirs[this._actions[i].direction] || dirs[this._actions[i].direction].z < this._actions[i].z) {
					dirs[this._actions[i].direction] = this._actions[i];
				}
			}
		}

		return dirs;
	}

	protected addWalkConnection(xLeft:number, xRight: number, direction: string, chunkId: number) {
		var action = new Teleport(this._manager, "Walk", chunkId);
		action.setBounds(xLeft, xRight);
		action.direction = direction;

		this._actions.push(action);
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