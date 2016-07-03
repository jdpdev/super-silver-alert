import {GameManager} from "../states/game-manager";

export class Action {

	protected _xLeft:number = 0;
	protected _xRight:number = 0;
	protected _direction: string = null;
	protected _z: number = 0;

	constructor(protected _manager:GameManager) {

	}

	setBounds(left: number, right: number) {
		this._xLeft = left;
		this._xRight = right;
	}

	/**
	 * Returns whether a given position allows the action
	 * @param  {number}  x The x position, relative to the action's scope (probably chunk coords)
	 * @return {boolean}   Whether action can activate
	 */
	checkBounds(x: number): boolean {
		return this._xLeft <= x && x <= this._xRight;
	}

	get icon(): PIXI.DisplayObject {
		return null;
	}

	get label(): string {
		return "Action";
	}
	
	set direction(value: string) {
		this._direction = value;
	}

	get direction(): string {
		return this._direction;
	}

	get z(): number {
		return this._z;
	}

	set z(value: number) {
		this._z = value;
	}

	/**
	 * Activate the action
	 */
	performAction(data?:any) { }
}