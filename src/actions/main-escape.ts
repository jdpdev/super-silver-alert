import {GameManager} from "../states/game-manager";
import {EscapeAction} from "./escape"
import {ConnectionDef} from "../world/blueprint-factory"

export class MainEntryEscape extends EscapeAction {

	constructor(manager: GameManager, connection: ConnectionDef) {
		super(manager, "Escape by Main Entry", connection);
	}

	/**
	 * Teleport to a new chunk
	 */
	performAction() {
		
	}

	get icon(): PIXI.DisplayObject {
		return null;
	}
}