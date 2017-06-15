import {Action} from "../../actions/action"

export type ItemDef = {
	id: number,
	name: string,
	actions: any[],
	texture: string,
	pickupDist: number
}

/**
 * Specification of an item
 */
export class Item {

	protected _id: number = 0;

	protected _name: string = "";

	/** @type {Action[]} Actions that can be performed on the item */
	protected _actions:Action[] = [];

	protected _texture: string = null;

	/** @type {number} Horizontal range from the center the item can be picked up from */
	protected _pickupDist: number = 20;

	get id(): number {
		return this._id;
	}

	/** @type {number} Horizontal range from the center the item can be picked up from */
	get pickupDistance(): number {
		return this._pickupDist;
	}

	get actions(): Action[] {
		return this._actions;
	}

	get texture(): string {
		return this._texture;
	}

	constructor(data:ItemDef) {
		this._id = data.id;
		this._name = data.name;

		if (data.actions) {
			this._actions = data.actions;
		}

		if (data.texture) {
			this._texture = data.texture;
		}
	}
}