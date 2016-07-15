import {GameManager} from "../states/game-manager";
import {EscapeAction} from "./escape"
import {ConnectionDef} from "../world/blueprint-factory"
import {Player} from "../world/actors/player"  
import {Chunk} from "../world/chunk"

export class BackDoorEscape extends EscapeAction {

	constructor(manager: GameManager, chunk: Chunk, connection: ConnectionDef) {
		super(manager, "Escape by Fire Exit", chunk, connection);
	}

	get icon(): PIXI.DisplayObject {
		return null;
	}
}