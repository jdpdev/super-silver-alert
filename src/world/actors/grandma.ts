import {Actor} from "../actor";
import {PlayerController} from "../../input/player-controller";

export class Grandma extends Actor {
	constructor(_game: Phaser.Game, _parent: PIXI.DisplayObjectContainer) {
		super(_game, _parent);

		this._controller = new PlayerController();
		this._controller.assignActor(this);
	}

	draw() {
		
	}
}