import {ItemDropRecord} from "./item-drop"

export class ItemManager {
	private _drops: ItemDropRecord[] = [];

	load(game:Phaser.Game) {
		game.load.json("items", "data/drops.json");
	}

	initialize(game: Phaser.Game) {
		var data = game.cache.getJSON("items");

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
}