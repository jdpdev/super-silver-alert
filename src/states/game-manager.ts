import {ChunkFactory} from "../world/chunk-factory";
import {Chunk} from "../world/chunk";
import {LinkedList} from "../util/linked-list";

export class GameManager extends Phaser.State {

	private _chunkFactory: ChunkFactory = null;

	private _chunks: LinkedList<Chunk> = new LinkedList<Chunk>();

	private _leftKey: Phaser.Key = null;
	private _rightKey: Phaser.Key = null;

	constructor() {
		super();
	}

	create() {
		this._chunkFactory = new ChunkFactory(this.game);
		this.game.stage.backgroundColor = 0x373a37;

		this.camera.bounds = null;

		this._leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this._rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		this.rebuildChunks(null);
	}

	update() {
		var scroll = 0;

		if (this._leftKey.isDown) {
			scroll = -1;
		} else if (this._rightKey.isDown) {
			scroll = 1;
		}

		if (scroll == 0) {
			return;
		}

		scroll = (this.game.time.elapsed / 1000) * 70 * scroll;
		this.camera.x += scroll;
	}

	/**
	 * Rebuild the chunks, starting with a specific chunk
	 * @param {any} home The description of the chunk to start with
	 */
	rebuildChunks(home: any) {

		// Remove existing
		var chunk: Chunk = this._chunks.first;

		if (chunk != null) {

			do {
				chunk.remove();
			} while (chunk = chunk.next);

			this._chunks = new LinkedList<Chunk>();
		}

		// Start building from the home chunk
		var chunk = this._chunkFactory.build(0xffe7e7, this.world);
		chunk.setPosition(0, 0);
		this._chunks.add(chunk);

		var lastChunk = chunk;
		var nextChunk = this._chunkFactory.build(0xccb7b7, this.world);
		nextChunk.setPosition(lastChunk.x + lastChunk.bounds.width, 0);
		this._chunks.addAfter(nextChunk, lastChunk);

		lastChunk = nextChunk;
		nextChunk = this._chunkFactory.build(0x998787, this.world);
		nextChunk.setPosition(lastChunk.x + lastChunk.bounds.width, 0);
		this._chunks.addAfter(nextChunk, lastChunk);

		lastChunk = chunk;
		nextChunk = this._chunkFactory.build(0xccb7b7, this.world);
		nextChunk.setPosition(lastChunk.x - nextChunk.bounds.width, 0);
		this._chunks.addBefore(nextChunk, lastChunk);

		lastChunk = nextChunk;
		nextChunk = this._chunkFactory.build(0x998787, this.world);
		nextChunk.setPosition(lastChunk.x - nextChunk.bounds.width, 0);
		this._chunks.addBefore(nextChunk, lastChunk);

		this.world.camera.x = -200; //this.world.camera.width / 2 - chunk.bounds.width / 2;
		this.world.camera.y = 0;
	}
}