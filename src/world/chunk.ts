import {ILinkable} from "../util/linked-list"
import {WorldObject} from "./world-object"

export abstract class Chunk extends WorldObject implements ILinkable {

	// Chunk chain (linked list of live chunks)
	protected _previous: Chunk = null;
	protected _next: Chunk = null;

	constructor(_game: Phaser.Game, _parent:PIXI.DisplayObjectContainer, protected _data: any) {
		super(_game, _parent);
	}

	remove() {
		super.remove();

		this._previous.next = this._next;
		this._next.previous = this._previous;

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