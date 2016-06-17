export class LinkedList<T extends ILinkable> {

	private _first: T = null;
	private _last: T = null;

	get first(): T { return this._first; }
	get last(): T { return this._last; }

	get length(): number {
		var count = 0;
		var iterator = this._first;

		if (iterator == null) {
			return 0;
		}

		do {
			count++;
		} while (iterator = <T>iterator.next);

		return count;
	}

	add(add:T) {
		if (this._last) {
			this._last.next = add;
			add.previous = this._last;
		}

		this._last = add;

		if (this._first == null) {
			this._first = add;
		}
	}

	addBefore(add: T, before: T) {
		if (!add || !before) {
			return;
		}

		if (before.previous) {
			add.previous = before.previous;
		}

		before.previous = add;
		add.next = before;

		if (add.previous == null) {
			this._first = add;
		}
	}

	addAfter(add: T, after: T) {
		if (!add || !after) {
			return;
		}

		if (after.next) {
			add.next = after.next;
		}

		after.next = add;
		add.previous = after;

		if (add.next == null) {
			this._last = add;
		}
	}

	remove(remove: T) {
		if (remove.previous) {
			remove.previous.next = remove.next;
		}

		if (remove.next) {
			remove.next.previous = remove.previous;
		}

		if (remove.previous == null) {
			this._first = <T>remove.next;
		}

		if (remove.next == null) {
			this._last = <T>remove.previous;
		}
	}
}

export interface ILinkable {
	next: ILinkable;
	previous: ILinkable;
}