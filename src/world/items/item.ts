import {Action} from "../../actions/action"

/**
 * Specification of an item
 */
export class Item {

	protected _id: number = 0;

	/** @type {Action[]} Actions that can be performed on the item */
	protected _actions:Action[] = [];

	protected _texture: string = null;

	/** @type {number} Horizontal range from the center the item can be picked up from */
	protected _pickupDist: number = 20;

	/** @type {number} Horizontal range from the center the item can be picked up from */
	get pickupDistance(): number {
		return this._pickupDist;
	}

	get actions(): Action[] {
		return this._actions;
	}

	constructor(data:any) {
		this._id = data.id;

		if (data.actions) {

		}

		if (data.texture) {
			this._texture = data.texture;
		}
	}
}