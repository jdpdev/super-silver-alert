import {ILinkable} from "../util/linked-list"
import {WorldObject} from "./world-object"
import {Item} from "./items/item"
import {Action} from "../actions/action"
import {Teleport} from "../actions/teleport"
import {MainEntryEscape} from "../actions/main-escape"
import {BackDoorEscape} from "../actions/back-escape"
import {GameManager} from "../states/game-manager"
import {ChunkDef, ConnectionDef} from "./blueprint-factory"
import {ItemDrop, ItemDropRecord} from "./items/item-drop"

export type DirectionActions = Action | Action[];
export type ChunkConnections = { up: DirectionActions, down: DirectionActions, left: DirectionActions, right: DirectionActions };

export abstract class Chunk extends WorldObject implements ILinkable {

	protected _manager: GameManager = null;

	protected _data: ChunkDef = null;

	// Chunk chain (linked list of live chunks)
	protected _previous: Chunk = null;
	protected _next: Chunk = null;

	protected _leftLimitX: number = 0;
	protected _rightLimitX: number = 0;

	protected _width: number = 0;

	/** @type {Item[]} Items within the chunk */
	protected _items: Item[] = [];

	protected _actions: Action[] = [];

	protected _drops: ItemDrop[] = null;

	constructor(_game: Phaser.Game, _parent: Phaser.Group, protected _id: number, data: ChunkDef) {
		super(_game, _parent);

		this._data = data;
		this._manager = <GameManager>_game.state.getCurrentState();
	}

	get id(): number { return this._id; }

	get width(): number { return this._width; }

	initialize() {

	}

	draw() {
		var drops = this._manager.itemManager.getDropsInChunk(this._id);
		this._drops = [];

		for (var i = 0; i < drops.length; i++) {
			this.addDrop(drops[i]);
		}
	}

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

	protected prepareContainer(parent: Phaser.Group) {
		super.prepareContainer(parent);
		this._container.name = "chunk";
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

		for (var drop of this._drops) {
			for (var action of drop.getActions(x)) {
				if (Array.isArray(dirs.up)) {
					dirs.up = [dirs.up];
				} else if (dirs.up == null) {
					dirs.up = [];
				}

				dirs.up.push(action);
			}
		}

		return dirs;
	}

	protected addConnection(xLeft: number, xRight: number, direction: string, target: ConnectionDef) {
		if (target.destination < 0) {
			this.addEscape(xLeft, xRight, direction, target);
		} else {
			this.addWalkConnection(xLeft, xRight, direction, target);
		}
	}

	private addWalkConnection(xLeft:number, xRight: number, direction: string, target: ConnectionDef) {
		var action = new Teleport(this._manager, "Walk", target);
		action.setBounds(xLeft, xRight);
		action.direction = direction;

		this._actions.push(action);
	}

	private addEscape(xLeft: number, xRight: number, direction: string, target: ConnectionDef) {
		var action = null;

		switch (target.destination) {
			
			// Main entry escape
			case -1:
				action = new MainEntryEscape(this._manager, this, target);
				break;

			// Back door escape
			case -2:
				action = new BackDoorEscape(this._manager, this, target);
				break;
			
			default:
				return;
		}

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

	protected addDrop(record: ItemDropRecord) {
		var drop = new ItemDrop(this._game, this._container);

		if (drop == null) {
			return;
		}

		drop.initialize(record);
		this._drops.push(drop);
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