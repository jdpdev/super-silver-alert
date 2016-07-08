import {Action} from "../../actions/action"

/**
 * Specification of an item
 */
export class Item {

	protected _id: number = 0;

	/** @type {Action[]} Actions that can be performed on the item */
	protected _actions:Action[] = [];

	protected _worldTextureId: string = null;
	protected _invTexutreId: string = null;

	/** @type {number} Horizontal range from the center the item can be picked up from */
	protected _pickupDist: number = 20;

	/** @type {number} Horizontal range from the center the item can be picked up from */
	get pickupDistance(): number {
		return this._pickupDist;
	}

	get actions(): Action[] {
		return this._actions;
	}

	get worldTexture(): string {
		return this._worldTextureId;
	}

	constructor(data:any) {
		this._id = data.id;

		if (data.actions) {

		}

		if (data.worldTexture) {
			this._worldTextureId = data.worldTexture;
		}

		if (data.invTexture) {
			this._invTextureId = data.invTexture;
		}
	}
}