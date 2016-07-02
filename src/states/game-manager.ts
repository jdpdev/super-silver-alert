import {BlueprintFactory} from "../world/blueprint-factory";
import {Blueprint, Corridor, EssentialChunk} from "../world/blueprints";
import {ChunkFactory} from "../world/chunk-factory";
import {Chunk} from "../world/chunk";
import {LinkedList} from "../util/linked-list";

import {Actor} from "../world/actor";
import {Player} from "../world/actors/player";
import {PlayerController} from "../input/player-controller";

export class GameManager extends Phaser.State {

	private _blueprint: Blueprint;

	private _chunkFactory: ChunkFactory = null;

	private _chunkLayer: Phaser.Group;
	private _pcLayer: Phaser.Group;

	private _chunks: LinkedList<Chunk> = new LinkedList<Chunk>();

	/** @type {Actor} The player */
	private _pc: Actor = null;

	constructor() {
		super();
	}

	init() {
		this.camera.bounds = null;
	}

	preload() {
		this._blueprint = new BlueprintFactory().generateBlueprint(1);
	}

	create() {
		this.game.stage.backgroundColor = 0x373a37;
		this.game.renderer.renderSession.roundPixels = true;

		this._chunkLayer = new Phaser.Group(this.game, this.world);
		this._pcLayer = new Phaser.Group(this.game, this.world);

		this._chunkFactory = new ChunkFactory(this.game);

		this._pc = new Player(this.game, this._pcLayer, this);
		this._pc.setController(new PlayerController(this, this.game.input));

		var start = this._blueprint.getCorridor(1);
		this.loadCorridor(start, start.getChunkInOrder(4).id);
	}

	update() {
		this._pc.update(this.game.time.elapsed / 1000);

		/*var scroll = 0;

		if (this._leftKey.isDown) {
			scroll = -1;
		} else if (this._rightKey.isDown) {
			scroll = 1;
		}

		if (scroll == 0) {
			return;
		}

		scroll = (this.game.time.elapsed / 1000) * 150 * scroll;
		this.camera.x += scroll;*/
	}

	protected clearWorld() {
		var chunk: Chunk = this._chunks.first;

		if (chunk != null) {

			do {
				chunk.remove();
			} while (chunk = chunk.next);

			this._chunkLayer.removeAll(true);

			this._chunks = new LinkedList<Chunk>();
		}
	}

	/**
	 * Teleport to a chunk
	 * @param {number} chunkId The id of the chunk to teleport to
	 */
	teleportToChunk(chunkId: number) {

		//console.log("teleportToChunk >> " + chunkId);
		
		// Special case, level exit
		if (chunkId == -1) {
			return;
		}

		var corridor = this._blueprint.findChunkCorridor(chunkId);

		if (corridor == null) {
			return;
		}

		this.loadCorridor(corridor, chunkId);
	}

	/**
	 * Load a corridor
	 * @param {Corridor} corridor The corridor to load
	 * @param {number}   chunkId  The id of the chunk to spawn at
	 */
	protected loadCorridor(corridor: Corridor, chunkId: number) {
		var desc = corridor.first;

		if (desc == null) {
			return;
		}

		var chunk: Chunk;
		var lastChunk: Chunk;
		var spawnPos: number = 0;
		this.clearWorld();

		do {
			chunk = this._chunkFactory.build(desc.id, desc.data, this._chunkLayer);
			this._chunks.add(chunk);
		} while (desc = <EssentialChunk>desc.next);

		// Need to draw and position after connections are made
		chunk = this._chunks.first
		lastChunk = null;

		do {
			chunk.draw();

			if (lastChunk) {
				chunk.setPosition(lastChunk.x + lastChunk.bounds.width, 0);
			} else {
				chunk.setPosition(0, 0);
			}

			if (chunk.id == chunkId) {
				spawnPos = chunk.x + (chunk.bounds.width / 2);
			}

			lastChunk = chunk;
		} while (chunk = chunk.next);

		//this.world.camera.x = spawnPos;
		
		this._pc.setPosition(spawnPos, 420);
		this._pc.setCameraFocus(this.world.camera);
		(<Player>this._pc).getLocationConnections();
	}

	/**
	 * Return the chunk a position is contained in
	 * @param  {number} x The x location of the world
	 * @return {Chunk}    The colliding chunk
	 */
	getLocationChunk(x: number): Chunk {
		var chunk = this._chunks.first;

		if (!chunk) {
			return null;
		}

		do {
			if (chunk.x <= x && x <= chunk.x + chunk.width) {
				return chunk;
			}

		} while (chunk = chunk.next);

		return null;
	}

	/**
	 * Return the corridor that a given chunk id belongs to
	 * @param  {number}   id The id of the chunk
	 * @return {Corridor}    The parent corridor
	 */
	getChunkCorridor(id: number): Corridor {
		return this._blueprint.findChunkCorridor(id);
	}
}