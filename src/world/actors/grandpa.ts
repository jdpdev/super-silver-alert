import {Player} from "./player";
import {GameManager} from "../../states/game-manager";
import {PlayerController} from "../../input/player-controller";

export class Grandpa extends Player {

	private _leftFootSprite: Phaser.Sprite;
	private _rightFootSprite: Phaser.Sprite;

	constructor(game: Phaser.Game, parent: Phaser.Group, state:GameManager) {
		super(game, parent, state);

		this.setController(new PlayerController(state, this._game.input));

		//this.draw();
	}

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