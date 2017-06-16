import {GameManager} from "../states/game-manager";
import {Action, ActionResponse} from "./action"
import {ItemManager} from "../world/items/item-manager"
import {Item} from "./../world/items/item"
import {ItemDrop} from "./../world/items/item-drop"
import {Player} from "../world/actors/player"

export class Pickup extends Action {

	private _item: Item = null;
	private _itemDrop: ItemDrop = null;
	private _invId: number = null;
	private _despawanOnUse: boolean = false;

	set drop(value: ItemDrop) {
		this._itemDrop = value;
	}

	constructor(manager: GameManager, data: any) {
		super(manager, "Pickup");

		this._icon = "pickupActionIcon";
		this._invId = data.item;
		this._item = ItemManager.getItem(data.item);
		this._despawanOnUse = data.remove;
	}

	/** Add to the user's inventory */
	performAction(player: Player): Promise<ActionResponse> {
		return new Promise<ActionResponse>(
			(resolve, reject) => {
				if (this._item == null) {
					reject(null);
				}

				if (this._itemDrop != null && this._despawanOnUse) {
					this._itemDrop.despawn();
				}

				player.inventory.add(this._item);
				resolve(new ActionResponse(true));
			}
		);
	}
}