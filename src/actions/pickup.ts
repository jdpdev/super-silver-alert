import {GameManager} from "../states/game-manager";
import {Action, ActionResponse, ActionDef, StateInputDef} from "./action"
import {DropAction} from "./drop-action"
import {ItemManager} from "../world/items/item-manager"
import {Item} from "./../world/items/item"
import {ItemDrop} from "./../world/items/item-drop"
import {Player} from "../world/actors/player"

/** Placeholder for the data loaded externally */
export class PickupDef extends ActionDef { 
	type: string;
	item: number;
	remove: boolean;
	state: StateInputDef;
};

export class Pickup extends DropAction {

	private _item: Item = null;
	private _invId: number = null;
	private _despawanOnUse: boolean = false;
	private _stateInput: StateInputDef = null;

	constructor(manager: GameManager, data: PickupDef) {
		super(manager, "Pickup", data);

		this._icon = "pickupActionIcon";
		this._invId = data.item;
		this._item = ItemManager.getItem(data.item);
		this._despawanOnUse = data.remove;
		this._stateInput = data.state;
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
				
				if (this._stateInput != null) {
					this.updateState(this._stateInput);
				}

				resolve(new ActionResponse(true));
			}
		);
	}

	isShown(): boolean {
		return !this.isRestricted();
	}
}