import {GameManager} from "../states/game-manager";
import {Action, ActionResponse} from "./action"
import {ItemDrop} from "./../world/items/item-drop"
import {Player} from "../world/actors/player"

export class Pickup extends Action {

	private _item: ItemDrop = null;
	private _invId: number = null;
	private _despawanOnUse: boolean = false;

	set drop(value: ItemDrop) {
		this._item = value;
	}

	constructor(manager: GameManager, data: any) {
		super(manager, "Pickup");

		this._icon = "pickupActionIcon";
		this._invId = data.item;
		this._despawanOnUse = data.remove;
	}

	/** Add to the user's inventory */
	performAction(player: Player): Promise<ActionResponse> {
		return new Promise<ActionResponse>(
			(resolve, reject) => {
				if (this._item == null) {
					reject(null);
				}

				if (this._despawanOnUse) {
					this._item.despawn();
				}

				player.inventory.add(this._invId);
				resolve(new ActionResponse(true));
			}
		);
	}
}