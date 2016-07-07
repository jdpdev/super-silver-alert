import {Player} from "./player";

export class Nurse extends Player {

	private _leftFootSprite: Phaser.Sprite;
	private _rightFootSprite: Phaser.Sprite;

	draw() {
		var texture = this._state.getTexture("nurse");
		this._sprite = this._game.add.sprite(texture.width / -2, -texture.height, null, null, this._container);
		this._sprite.texture = texture;

		this._leftFootSprite = this._game.add.sprite(-20, -28, null, null, this._container);
		this._leftFootSprite.texture = this._state.getTexture("nurse-foot");

		this._rightFootSprite = this._game.add.sprite(5, -28, null, null, this._container);
		this._rightFootSprite.texture = this._state.getTexture("nurse-foot");
	}
}