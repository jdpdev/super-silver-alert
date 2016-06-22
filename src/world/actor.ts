import {WorldObject} from "./world-object";
import {Controller} from "../input/controller";

export class Actor extends WorldObject {

	protected _controller: Controller = null;

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	translate(dx: number, dy: number) {
		this._container.x += dx;
		this._container.y += dy;
	}

	draw() {

	}
}