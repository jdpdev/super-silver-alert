import {Chunk} from "./chunk";

export class ChunkFactory {

	constructor(protected _game:Phaser.Game) {

	}

	/**
	 * Instantiate a new chunk
	 * @return {Chunk} The new chunk
	 */
	build(data:any, parent:PIXI.DisplayObjectContainer):Chunk {
		return new Chunk(this._game, parent, data);
	}
}