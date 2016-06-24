import {Chunk} from "./chunk";
import {CorridorChunk} from "./chunks/corridor";

export class ChunkFactory {

	constructor(protected _game:Phaser.Game) {

	}

	/**
	 * Instantiate a new chunk
	 * @return {Chunk} The new chunk
	 */
	build(id:number, data:any, parent:Phaser.Group):Chunk {
		switch (data.biome) {
			
			// Reception
			/*case 0:
				break;*/

			// Corridor
			case 1:
			default:
				return new CorridorChunk(this._game, parent, id, data);

			// Patio
			/*case 2:
				break;

			// Nurse
			case 3:
				break;

			// Common area
			case 4:
				break;*/
		}
	}
}