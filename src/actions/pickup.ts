import {GameManager} from "../states/game-manager";
import {Action, ActionResponse} from "./action"
import {ItemDrop} from "./../world/items/item-drop"
import {Player} from "../world/actors/player"

export class Pickup extends Action {

	constructor(manager: GameManager, label: string, private _item: ItemDrop) {
		super(manager, label);
	}

	/** Add to the user's inventory */
	performAction(player: Player): Promise<ActionResponse> {
		return new Promise<ActionResponse>(
			(resolve, reject) => {
				player.inventory.add(this._item.item);
				this._item.despawn();
				resolve(new ActionResponse(true));
			}
		);
	}
}