export class WalkTweenManager {
	private _leftLeg: Phaser.Sprite;
	private _rightLeg: Phaser.Sprite;

	private _leftStartX: number = 0;
	private _rightStartX: number = 0;

	private _leftLegTween: Phaser.Tween;
	private _rightLegTween: Phaser.Tween;

	constructor(private _game: Phaser.Game) {

	}

	setLegs(left: Phaser.Sprite, leftEndX: number, right: Phaser.Sprite, rightEndX: number, duration: number) {
		this._leftLeg = left;
		this._rightLeg = right;
		this._leftStartX = left.x;
		this._rightStartX = right.x;

		this._leftLegTween = new Phaser.Tween(this._leftLeg, this._game, this._game.tweens);
		this._rightLegTween = new Phaser.Tween(this._rightLeg, this._game, this._game.tweens);

		this._leftLegTween.to({x: leftEndX}, duration, null, false, 0, -1, true); 
		this._rightLegTween.to({x: rightEndX}, duration, null, false, 0, -1, true); 

		this._leftLegTween.start();
		this._rightLegTween.start();
		this._leftLegTween.pause();
		this._rightLegTween.pause();
	}

	start() {
		this._leftLegTween.resume();
		this._rightLegTween.resume();
	}

	stop() {
		this._leftLegTween.pause();
		this._rightLegTween.pause();

		this._leftLeg.x = this._leftStartX;
		this._rightLeg.x = this._rightStartX;
	}
}