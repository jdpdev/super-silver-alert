import {BlueprintFactory} from "../world/blueprint-factory";
import {Blueprint, Corridor, EssentialChunk} from "../world/blueprints";
import {ChunkFactory} from "../world/chunk-factory";
import {ItemManager} from "../world/items/item-manager";
import {Chunk} from "../world/chunk";
import {LinkedList} from "../util/linked-list";

import {Actor} from "../world/actor";
import {Player} from "../world/actors/player";
import {Grandpa} from "../world/actors/grandpa";
import {Nurse} from "../world/actors/nurse";

import {PlayerController} from "../input/player-controller";
import {AIManager} from "../input/ai-manager";
import {TextureManager} from "../content/texture-manager";
import {GameTimeManager, GameDate} from "../util/game-time";
import {StateManager} from "../fsm/state-manager";

import {EscapeAction} from "../actions/escape";

export class GameManager extends Phaser.State {

	private _blueprint: Blueprint;

	private _itemManager: ItemManager = null;
	private _chunkFactory: ChunkFactory = null;
	private _textureManager: TextureManager = null;
	private _gameTime: GameTimeManager = null;
	private _aiManager: AIManager = null;
	private _stateManager: StateManager = null;

	private _chunkLayer: Phaser.Group;
	private _pcLayer: Phaser.Group;
	private _frontLayer: Phaser.Group;
	private _fadeOut: Phaser.Graphics;
	private _timeText: Phaser.Text;

	private _corridor: Corridor = null;

	private _chunks: LinkedList<Chunk> = new LinkedList<Chunk>();

	/** @type {Actor} The player */
	private _pc: Actor = null;

	private _pauseLoop: boolean = false;

	private _delayCameraLock: boolean = false;

	private _fadeTween: Phaser.Tween = null;

	get gameDate() {
		return this._gameTime.date;
	}

	get itemManager(): ItemManager {
		return this._itemManager;
	}

	constructor() {
		super();
	}

	init() {
		this.camera.bounds = null;
	}

	preload() {
		this._blueprint = new BlueprintFactory().generateBlueprint(1);

		this._itemManager = new ItemManager();
		this._itemManager.load(this.game);

		this._stateManager = new StateManager();
		this._stateManager.loadTree(this.game, "state-tree");
	}

	create() {
		this.game.stage.backgroundColor = 0x373a37;
		this.game.renderer.renderSession.roundPixels = true;

		this._stateManager.initialize(this.game);

		// Set game time
		this._gameTime = new GameTimeManager(this, 60);
		var now = this._gameTime.date;
		now.advanceTo(9, 0);
		this._gameTime.advanceToDate(now);

		this._chunkLayer = new Phaser.Group(this.game, this.world);
		this._pcLayer = new Phaser.Group(this.game, this.world);
		this._frontLayer = new Phaser.Group(this.game, this.world);
		
		this._fadeOut = this.game.add.graphics(0, 0, this.world);
		this._fadeOut.beginFill(0x000000);
		this._fadeOut.drawRect(0, 0, this.stage.width, this.stage.height);
		this._fadeOut.endFill();
		this.stage.addChild(this._fadeOut);
		this._fadeOut.alpha = 0;

		this._timeText = this.game.add.text(5, 5, "Hello!", {fontSize: 16, fill: "#ffffff"}, this.world);
		this.stage.addChild(this._timeText);

		this._pcLayer.y = 10;
		this._frontLayer.y = 15;

		this._aiManager = new AIManager(this);
		this._chunkFactory = new ChunkFactory(this.game);
		this._textureManager = new TextureManager(this);
		this._itemManager.initialize(this.game);

		this._pc = new Grandpa(this.game, null, this);
		this._pc.setParent(this._pcLayer);
		this._pc.spawn();

		var start = this._blueprint.startCorridor;
		this.loadCorridor(start, this._blueprint.startChunk);
	}

	update() {
		var delta = this.game.time.elapsed / 1000;
		
		if (!this._pauseLoop) {
			this._gameTime.update(delta);
			this._pc.update(delta);
			this._aiManager.update(delta);
		}

		this._timeText.text = this._gameTime.date.toString();

		// this._pc.setCameraFocus(this.world.camera);
		
		//if (!this._delayCameraLock) {
			if (this._pc.x < 400 || this._pc.x >= (this._chunks.length - 1) * 400) {
				this._pc.setCameraFocus(this.world.camera, false);
			} else {
				this._pc.setCameraFocus(this.world.camera, true);
			}
		//}
	}

	getTexture(name: string): PIXI.RenderTexture {
		return this._textureManager.getTexture(name);
	}

	protected clearWorld() {
		var chunk: Chunk = this._chunks.first;

		if (chunk != null) {

			do {
				chunk.remove();
			} while (chunk = chunk.next);

			this._chunkLayer.removeAll(true);
			this._frontLayer.removeAll(true);

			this._chunks = new LinkedList<Chunk>();
		}
	}

	/**
	 * Teleport to a chunk
	 * @param {number} chunkId The id of the chunk to teleport to
	 */
	teleportToChunk(chunkId: number): boolean {

		//console.log("teleportToChunk >> " + chunkId);
		
		// Special case, level exit
		if (chunkId == -1) {
			return false;
		}

		var corridor = this._blueprint.findChunkCorridor(chunkId);

		if (corridor == null) {
			return false;
		}

		return this.loadCorridor(corridor, chunkId);
	}

	/**
	 * Load a corridor
	 * @param {Corridor} corridor The corridor to load
	 * @param {number}   chunkId  The id of the chunk to spawn at
	 */
	protected loadCorridor(corridor: Corridor, chunkId: number): boolean {
		var desc = corridor.first;

		if (desc == null) {
			return false;
		}

		this._corridor = corridor;

		var chunk: Chunk;
		var lastChunk: Chunk;
		var spawnPos: number = 0;
		this.clearWorld();

		do {
			chunk = this._chunkFactory.build(desc.id, desc.data, this._chunkLayer);

			if (chunk != null) {
				chunk.spawn();
				this._chunks.add(chunk);
			}
		} while (desc = <EssentialChunk>desc.next);

		// Need to draw and position after connections are made
		chunk = this._chunks.first
		lastChunk = null;

		do {
			chunk.initialize();
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

		this._aiManager.changeLocation(corridor.id);
		
		this._pc.setPosition(spawnPos, 420);
		this._pc.setCameraFocus(this.world.camera, true, true);
		(<Player>this._pc).getLocationConnections();
		(<PlayerController>this._pc.controller).sceneTransitioned();

		//this._delayCameraLock = true;
		//setTimeout(() => this._delayCameraLock = false, 0.15);

		return true;
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

	protected getChunkLocation(chunkId: number): number {
		var chunk = this._chunks.first;

		if (!chunk) {
			return null;
		}

		do {
			if (chunk.id == chunkId) {
				return chunk.x + (chunk.bounds.width / 2);
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

	addAI(actor: Actor, chunkId: number) {
		// Randomly select chunk
		if (chunkId == null) {
			chunkId = this._corridor.getRandomChunk();
		}

		var loc = this.getChunkLocation(chunkId);

		if (loc != null) {
			//this._frontLayer.add(actor);
			actor.setParent(this._frontLayer);
			actor.setPosition(loc, 420);
			actor.spawn();
		}
	}

	get aiLayer(): Phaser.Group {
		return this._frontLayer;
	}

	removeAI(actor: Actor) {
		actor.remove();
	}

	escapeAttempt(action: EscapeAction) {

		// Check if any AIs are going to catch the attempt.
		this.checkAIOnEscape(action);
	}

	/**
	 * Check with the AI manager if any AIs catch the escape
	 * @param {EscapeAction} action The escape action
	 */
	private checkAIOnEscape(action: EscapeAction) {
		this._aiManager.escapeAttempt(action)
			.then(
				(escape) => {
					if (escape == EscapeMode.RedHanded) {
						this.transitionToNextDay();
					} else {
						// Escape was not caught, check for things that will catch on the break
						this.checkDelayOnEscape(action);
					}
				}
			);
	}

	/**
	 * Check if the puzzle state catches the escape
	 * @param {EscapeAction} action The escape action
	 */
	private checkDelayOnEscape(action: EscapeAction) {

	}

	transitionToNextDay() {
		this._pauseLoop = true;

		var inTween: Phaser.Tween = new Phaser.Tween(this._fadeOut, this.game, this.game.tweens);
		inTween.to({alpha: 1}, 1000);
		inTween.onComplete.add(this.doNextDayTransition, this);
		
		var outTween: Phaser.Tween = new Phaser.Tween(this._fadeOut, this.game, this.game.tweens);
		outTween.to({alpha: 0}, 1000, null, true, 1000); 
		outTween.onComplete.add(this.endNextDayTransition, this);

		inTween.chain(outTween);
		inTween.start();
	}

	private doNextDayTransition() {
		var date = this._gameTime.date;
		date.advanceTo(9, 0);
		this._gameTime.advanceToDate(date);

		this.loadCorridor(this._blueprint.startCorridor, this._blueprint.startChunk);
		this.game.paused = false;	
	}

	private endNextDayTransition() {
		this._pauseLoop = false;
	}

	lockoutControls(lock: boolean) {
		(<PlayerController>this._pc.controller).controlLockout(lock);
	}
}

export enum EscapeMode {
	None,
	RedHanded,
	Delayed
}