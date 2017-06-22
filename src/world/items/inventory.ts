import {Item} from "./item";
import {Pack} from "../../ui/pack"

export class Inventory {
	private _items = new Map<number, Item>();
	private _myPack: Pack = null;

	set pack(value: Pack) {
		this._myPack = value;
	}

	get items() {
		return this._items;
	}

	add(item: Item) {
		this._items.set(item.id, item);
		this.syncPack();
	}

	remove(item: Item) {
		this._items.delete(item.id);
		this.syncPack();
	}

	private syncPack() {
		if (this._myPack != null) {
			this._myPack.wantRedraw();
		}
	}
}