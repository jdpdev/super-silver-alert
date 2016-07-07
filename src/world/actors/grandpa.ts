import {Player} from "./player";

export class Grandpa extends Player {

	private _leftFootSprite: Phaser.Sprite;
	private _rightFootSprite: Phaser.Sprite;

	draw() {
		var texture = this._state.getTexture("grandpa");
		this._sprite = this._game.add.sprite(texture.width / -2, -texture.height - 10, null, null, this._container);
		this._sprite.texture = texture;

		this._leftFootSprite = this._game.add.sprite(texture.width / -2 + 15, -25, null, null, this._container);
		this._leftFootSprite.texture = this._state.getTexture("grandpa-foot");

		this._rightFootSprite = this._game.add.sprite(texture.width / 2 - 20, -25, null, null, this._container);
		this._rightFootSprite.texture = this._state.getTexture("grandpa-foot");
	}
}