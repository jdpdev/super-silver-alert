import {WorldObject} from "../world-object"
import {Action} from "../../actions/action"
import {Item} from "./item"

/**
 * An item dropped in the world.
 */
export class ItemDrop extends WorldObject {

	/** @type {Item} The item description */
	protected _item: Item = null;

	/** @type {number} Size of the area the item can be picked up from */
	protected _collisionWidth: number = 0;

	get item(): Item {
		return this._item;
	}

	drop(item: Item) {
		this._item = item;
		this._container.create(0, 0, this.manager.getTexture(item.worldTexture));
	}

	draw() {

	}

	/**
	 * Remove the drop from the world
	 */
	despawn() {
		this._container.destroy(true);
	}

	getActions(x: number): Action[] {
		var actions: Action[] = [];

		this._item.actions.forEach((action) => {
			if (action.isWorldAction) {
				actions.push(action);
			}
		});

		return actions;
	}
}