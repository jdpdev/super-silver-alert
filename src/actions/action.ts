import {GameManager} from "../states/game-manager";

export class Action {

	constructor(protected _manager:GameManager) {

	}

	/**
	 * Activate the action
	 */
	performAction(data?:any) { }

	get icon(): PIXI.DisplayObject {
		return null;
	}

	get label(): string {
		return "Action";
	}
}