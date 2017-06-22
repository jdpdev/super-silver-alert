import {Action} from "./action"
import {ItemDrop} from "../world/items/item-drop"

/**
 * An action with specific item drop functionality
 */
export class DropAction extends Action {
	protected _itemDrop: ItemDrop = null;

	set drop(value: ItemDrop) {
        this._itemDrop = value;
	}
}