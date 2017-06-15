import {WorldObject} from "../world-object"
import {Action} from "../../actions/action"
import {ActionFactory} from "../../actions/action-factory"
import {Item} from "./item"
import {ItemManager} from "./item-manager"

export class ItemDropRecord {
	protected _id: number = null;
	protected _itemId: number = null;
	protected _name: string = null;
	protected _texture: string = null;

	/** @type {number} Id of the chunk the item is located */
	protected _chunkLocation: number = null;

	protected _chunkOffset: Phaser.Point = null;
	protected _width: number = 0;

	protected _actions: any[] = null;

	get id(): number { return this._id; }
	get itemId(): number { return this._itemId; }
	get name(): string { return this._name; }
	get texture(): string { return this._texture; }
	get chunk(): number { return this._chunkLocation; }
	get chunkOffset(): Phaser.Point { return this._chunkOffset; }
	get width(): number { return this._width; }
	get actions(): any[] { return this._actions; }

	constructor(data: any) {
		this._id = data.id;
		this._itemId = data.itemId;
		this._name = data.name;
		this._texture = data.texture;
		this._chunkLocation = data.chunk.id;
		this._chunkOffset = new Phaser.Point(data.chunk.x, data.chunk.y);
		this._width = data.chunk.width;
		this._actions = data.actions;
	}
}

/**
 * An item dropped in the world.
 */
export class ItemDrop extends WorldObject {

	protected _record: ItemDropRecord = null;

	/** @type {Item} The item description */
	protected _item: Item = null;

	/** @type {number} Size of the area the item can be picked up from */
	protected _collisionWidth: number = 0;

	protected _actions: Action[] = null;

	get item(): Item {
		return this._item;
	}

	initialize(record:ItemDropRecord) {
		this._record = record;
		this._item = ItemManager.getItem(record.itemId);
		this.draw();

		this._actions = [];

		this._item.actions.forEach((action) => {
			var spawned = ActionFactory.buildAction(action, this.manager)

			spawned.setBounds(record.chunkOffset.x - this._item.pickupDistance, record.chunkOffset.x + record.width + this._item.pickupDistance);

			this._actions.push(spawned);
		});
	}

	drop(item: Item) {
		this._item = item;
		
	}

	draw() {
		if (this._item != null) {
			this._container.create(this._record.chunkOffset.x, this._record.chunkOffset.y, this.manager.getTexture(this._item.texture));
		}
	}

	/**
	 * Remove the drop from the world
	 */
	despawn() {
		this._container.destroy(true);
	}

	getActions(x: number): Action[] {
		if (this._actions == null || this._actions.length == 0) {
			return [];
		}

		var actions: Action[] = [];

		for (var action of this._actions) {
			if (action.checkBounds(x)) {
				actions.push(action);
			}
		}

		return actions;
	}
}