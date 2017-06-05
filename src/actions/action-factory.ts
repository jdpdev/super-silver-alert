import {Action} from "./action"
import {Pickup} from "./pickup"
import {GameManager} from "../states/game-manager"

export class ActionFactory {
	static buildAction(data:any, manager: GameManager): Action {
		switch (data.type) {
			default:
				return null;

			case "pickup":
				return new Pickup(manager, data);
		}
	}
}