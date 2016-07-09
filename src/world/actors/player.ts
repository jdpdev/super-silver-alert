import {Actor} from "../actor";
import {Inventory} from "../items/inventory";
import {Chunk, ChunkConnections} from "../chunk";
import {Controller} from "../../input/controller";
import {WalkTweenManager} from "../../util/walk-tweener";
import {GameManager} from "../../states/game-manager";

export class Player extends Actor {

	protected _actions: ChunkConnections;

	protected _inventory: Inventory = null;

	protected _moveDirection: number = 0;
	protected _lastMoveDirection: number = 0;

	/** @type {number} Movement speed of the actor, px/s */
	protected _moveSpeed: number = 150;

	protected _walkTween: WalkTweenManager;

	get inventory(): Inventory {
		if (this._inventory == null) {
			this._inventory = new Inventory();
		}

		return this._inventory;
	}

	get connections(): ChunkConnections {
		return this._actions;
	}

	constructor(_game: Phaser.Game, _parent: Phaser.Group, _state:GameManager) {
		super(_game, _parent, _state);

		this._walkTween = new WalkTweenManager(_game);
	}

	/**
	 * Update every tick
	 * @param {number} delta Time elapsed since last tick
	 */
	update(delta: number) {
		super.update(delta);

		if (this._moveDirection != 0) {
			this.translate(delta * this._moveSpeed * this._moveDirection, 0);
		}
	}

	spawn() {
		this._controller.spawn();
	}

	move(direction: number) {
		this._lastMoveDirection = this._moveDirection;
		this._moveDirection = direction;

		if (this._lastMoveDirection != direction) {
			if (direction == 0) {
				this._walkTween.stop();
				this.endWalk();
			} else {
				this._walkTween.start();
				this.startWalk();
			}
		}
	}

	protected startWalk() {

	}

	protected endWalk() {

	}

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	protected translate(dx: number, dy: number): Chunk {
		var chunk = super.translate(dx, dy);

		if (chunk) {
			this._actions = chunk.getActions(this.x);
		} else {
			this._actions = null;
		}

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

	setController(controller: Controller) {
		this._controller = controller;
		controller.assignActor(this);
	}
}