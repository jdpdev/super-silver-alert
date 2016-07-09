import {Player} from "./player";
import {GameManager} from "../../states/game-manager";
import {PlayerController} from "../../input/player-controller";

export class Grandpa extends Player {

	private _leftFootSprite: Phaser.Sprite;
	private _rightFootSprite: Phaser.Sprite;

	private _armSprite: Phaser.Sprite;
	private _armZeroX: number = 0;

	private _caneTween: Phaser.Tween;

	constructor(game: Phaser.Game, parent: Phaser.Group, state:GameManager) {
		super(game, parent, state);

		this.setController(new PlayerController(state, this._game.input));
		this._moveSpeed = 100;
	}

	protected startWalk() {
		this._caneTween.resume();
	}

	protected endWalk() {
		this._caneTween.pause();
		this._armSprite.x = this._armZeroX;
	}

	draw() {
		var texture = this._state.getTexture("grandpa");
		
		this._armSprite = this._game.add.sprite(texture.width / -2 - 10, -55, null, null, this._container);
		this._armSprite.texture = this._state.getTexture("grandpa-arm");
		this._armZeroX = texture.width / -2 - 10;

		this._sprite = this._game.add.sprite(texture.width / -2, -texture.height - 10, null, null, this._container);
		this._sprite.texture = texture;

		this._leftFootSprite = this._game.add.sprite(texture.width / -2 + 5, -25, null, null, this._container);
		this._leftFootSprite.texture = this._state.getTexture("grandpa-foot");

		this._rightFootSprite = this._game.add.sprite(texture.width / 2 - 20, -25, null, null, this._container);
		this._rightFootSprite.texture = this._state.getTexture("grandpa-foot");

		this._walkTween.setLegs(this._leftFootSprite, this._leftFootSprite.x + 35, this._rightFootSprite, this._rightFootSprite.x - 35, 500);

		this._caneTween = new Phaser.Tween(this._armSprite, this._game, this._game.tweens);
		this._caneTween.to({x: this._armSprite.x + 5}, 500, null, false, 0, -1, true);
		this._caneTween.start();
		this._caneTween.pause();

		/*this._leftFootTween = new Phaser.Tween(this._leftFootSprite, this._game, this._game.tweens);
		this._rightFootTween = new Phaser.Tween(this._rightFootSprite, this._game, this._game.tweens);

		this._leftFootTween.to({x: this._leftFootSprite.x + 35}, 500);
		this._rightFootTween.to({x: this._rightFootSprite.x - 35}, 500);

		this._leftFootTween.yoyo(true, 0);
		this._rightFootTween.yoyo(true, 0);
		this._leftFootTween.repeatAll(-1);
		this._rightFootTween.repeatAll(-1);

		this._leftFootTween.start();
		this._leftFootTween.pause();

		this._rightFootTween.start();
		this._rightFootTween.pause();*/
	}
}