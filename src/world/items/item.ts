import {WorldObject} from "../world-object"
import {Action} from "../../actions/action"

export class Item extends WorldObject {

	/** @type {number} Size of the area the item can be picked up from */
	protected _collisionWidth: number = 0;

	constructor(game: Phaser.Game, parent: Phaser.Group, data: any) {
		super(game, parent);
	}

	draw() {

	}

	getActions(x: number): Action[] {
		return null;
	}
}