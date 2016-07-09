import {Actor} from "../actor";
import {Inventory} from "../items/inventory";
import {Chunk, ChunkConnections} from "../chunk";
import {Controller} from "../../input/controller";

export class Player extends Actor {

	protected _actions: ChunkConnections;

	protected _inventory: Inventory = null;

	protected _moveDirection: number = 0;

	get inventory(): Inventory {
		if (this._inventory == null) {
			this._inventory = new Inventory();
		}

		return this._inventory;
	}

	get connections(): ChunkConnections {
		return this._actions;
	}

	/**
	 * Update every tick
	 * @param {number} delta Time elapsed since last tick
	 */
	update(delta: number) {
		super.update(delta);

		if (this._moveDirection != 0) {
			this.translate(delta * 150 * this._moveDirection, 0);
		}
	}

	move(direction: number) {
		this._moveDirection = direction;
	}

	/**
	 * Translate the actor by a certain amount
	 * @param {number} dx Change in x position
	 * @param {number} dy Change in y position
	 */
	protected translate(dx: number, dy: number): Chunk {
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

	setController(controller: Controller) {
		this._controller = controller;
		controller.assignActor(this);
	}
}