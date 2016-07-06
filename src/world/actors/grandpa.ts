import {Player} from "./player";

export class Grandpa extends Player {

	private _leftFootSprite: Phaser.Sprite;
	private _rightFootSprite: Phaser.Sprite;

	draw() {
		this._sprite = this._game.add.sprite(-30, -60, null, null, this._container);
		this._sprite.texture = this._state.getTexture("grandpa");

		this._leftFootSprite = this._game.add.sprite(-20, -10, null, null, this._container);
		this._leftFootSprite.texture = this._state.getTexture("grandpa-foot");

		this._rightFootSprite = this._game.add.sprite(20, -10, null, null, this._container);
		this._rightFootSprite.texture = this._state.getTexture("grandpa-foot");
	}
}