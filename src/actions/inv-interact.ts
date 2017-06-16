import {GameManager} from "../states/game-manager";
import {Action, ActionResponse} from "./action"
import {Player} from "../world/actors/player"

/**
 * Interact with items in the inventory
 *
 * {
 * 	interactions: [
 * 		{
 * 			with: <id>, # or 'default'
 * 			message: <string>,
 * 			result: <item id>,
 * 			event: <thing that happens>
 * 		},
 * 		...
 * 	]
 * }
 */
export class InventoryInteraction extends Action {

	constructor(manager: GameManager, label: string) {
		super(manager, label, null);
	}

	/** Add to the user's inventory */
	performAction(player: Player): Promise<ActionResponse> {
		return null;
	}
}