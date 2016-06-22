export abstract class WorldObject {
	protected _container: Phaser.Group = null;

	constructor(protected _game: Phaser.Game, protected _parent: PIXI.DisplayObjectContainer) {
		this._container = _game.add.group(_parent);
	}

	/**
	 * Returns the bounds of the object in screen space
	 * @return {PIXI.Rectangle} The bounds of the object
	 */
	get bounds(): PIXI.Rectangle {
		return this._container.getBounds();
	}

	/**
	 * @return {number} The x position of the object within its parent
	 */
	get x(): number {
		return this._container.x;
	}

	/**
	 * @return {number} The y position of the object within its parent
	 */
	get y(): number {
		return this._container.y;
	}

	/**
	 * Sets the position of the object relative to its parent.
	 * @param {number} x X-position
	 * @param {number} y Y-position
	 */
	setPosition(x: number, y: number) {
		this._container.x = x;
		this._container.y = y;
	}

	/**
	 * Remove the object from display
	 */
	remove() {
		this._container.destroy(true);
	}

	abstract draw();
}