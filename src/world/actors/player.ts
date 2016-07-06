import {Actor} from "../actor";
import {Chunk, ChunkConnections} from "../chunk";

export class Player extends Actor {

	protected _actions: ChunkConnections;

	get connections(): ChunkConnections {
		return this._actions;
	}

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	translate(dx: number, dy: number): Chunk {
		var chunk = super.translate(dx, dy);
		this._actions = chunk.getActions(this.x);

		this._container.scale = new Phaser.Point(dx > 0 ? -1 : 1, 1);

		return chunk;
	}

	/**
	 * Set the chunk connections for the current location
	 * @return {number} [description]
	 */
	getLocationConnections() {
		this._actions = this.getLocationChunk(this.x).getActions(this.x);
	}
}