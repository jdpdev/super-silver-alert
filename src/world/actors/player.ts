import {Actor} from "../actor";
import {Chunk, ChunkConnections} from "../chunk";

export class Player extends Actor {

	protected _connections: ChunkConnections;

	get connections(): ChunkConnections {
		return this._connections;
	}

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	translate(dx: number, dy: number): Chunk {
		var chunk = super.translate(dx, dy);
		this._connections = chunk.hasConnection(this.x);

		return chunk;
	}
}