import {ItemDropRecord} from "./item-drop"
import {Item} from "./item"

export class ItemManager {
	private static _instance: ItemManager = null;

	private _items: Item[] = [];
	private _drops: ItemDropRecord[] = [];

	load(game:Phaser.Game) {
		ItemManager._instance = this;

		game.load.json("items", "data/items.json");
		game.load.json("drops", "data/drops.json");
	}

	initialize(game: Phaser.Game) {

		var items = game.cache.getJSON("items");

		for (var def of items.items) {
			this._items.push(new Item(def));
		}

		// Drops
		var data = game.cache.getJSON("drops");

		for (var i = 0; i < data.drops.length; i++) {
			this._drops.push(new ItemDropRecord(data.drops[i]));		
		}
	}

	/**
	 * Returns a list of item drops in a specific chunk
	 * @param  {number}     id The id of the chunk
	 * @return {ItemDropRecord[]}    The list of member drops
	 */
	getDropsInChunk(id: number): ItemDropRecord[] {
		var drops: ItemDropRecord[] = [];

		for (var i = 0; i < this._drops.length; i++) {
			if (this._drops[i].chunk == id) {
				drops.push(this._drops[i]);
			}
		}

		return drops;
	}

	/**
	 * Returns the item with a given id
	 * @param id The id of the item
	 * @returns The matching item, or null on error
	 */
	static getItem(id: number): Item {
		return this._instance.getItemWithId(id);
	}

	/**
	 * Returns the item with a given id
	 * @param id The id of the item
	 * @returns The matching item, or null on error
	 */
	protected getItemWithId(id: number): Item {
		for (var item of this._items) {
			if (item.id == id) {
				return item;
			}
		}

		return null;
	}
}