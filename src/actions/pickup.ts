import {GameManager} from "../states/game-manager";
import {Action} from "./action"
import {Item} from "./../world/items/item"
import {Player} from "../world/actors/player"

export class Pickup extends Action {

	constructor(manager: GameManager, label: string, private _item: Item) {
		super(manager, label);
	}

	/** Add to the user's inventory */
	performAction(player: Player) {
		
	}
}