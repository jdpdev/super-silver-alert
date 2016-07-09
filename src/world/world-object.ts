import {GameManager} from "../states/game-manager"

export abstract class WorldObject {
	protected _container: Phaser.Group = null;

	constructor(protected _game: Phaser.Game, protected _parent: Phaser.Group) {
		if (this._parent != null) {
			this.prepareContainer(_parent);
		}
	}

	get manager():GameManager {
		var state = this._game.state.getCurrentState();

		if (state instanceof GameManager) {
			return <GameManager>state;
		} else {
			return null;
		}
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

	setParent(parent: Phaser.Group) {
		this.prepareContainer(parent);
		parent.add(this._container);
		
	}

	protected prepareContainer(parent: Phaser.Group) {
		this._parent = parent;
		this._container = this._game.add.group(parent);
		this.draw();
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
		this._container.destroy(true, false);
	}

	abstract draw();
}