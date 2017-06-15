import {GameManager} from "../states/game-manager";
import {Player} from "../world/actors/player";
import {Restriction, RestrictionResponse} from "./components/restriction";
import {UI} from "../ui/ui"

export class ActionResponse {
	constructor(protected _success:boolean, protected _message:string = "") {}

	get isSuccess(): boolean {
		return this._success;
	}

	get message(): string {
		return this._message;
	}
}

export abstract class Action {

	static ICON_SIZE: number = UI.ACTION_ICON_SIZE;

	protected _xLeft:number = 0;
	protected _xRight:number = 0;
	protected _direction: string = null;
	protected _z: number = 0;

	/** @type {boolean} Whether the action happens in the world (true) or in the inventory (false) */
	protected _isWorldAction: boolean = true;

	protected _restrictions: Restriction[];

	protected _instigator: Player;

	protected _icon: string = null;

	get isWorldAction(): boolean {
		return this._isWorldAction;
	}

	get instigator(): Player {
		return this._instigator;
	}

	constructor(protected _manager:GameManager, protected _label: string) {

	}

	setBounds(left: number = 0, right: number = 0) {
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

	get icon(): string {
		return this._icon;
	}

	get label(): string {
		return this._label;
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
	performAction(instigator: Player, data?:any): Promise<ActionResponse> { 
		this._instigator = instigator;
		return null;
	}

	addRestriction(restriction: Restriction) {
		if (this._restrictions == null) {
			this._restrictions = [];
		}

		this._restrictions.push(restriction);
	}

	/**
	 * Returns if the action is restricted
	 * @return {RestrictionResponse|boolean} 
	 */
	isRestricted(): RestrictionResponse | boolean {
		if (this._restrictions) {
			for (var i = 0; i < this._restrictions.length; i++) {
				var response = this._restrictions[i].isRestricted(this._manager);

				if (response.isRestricted) {
					return response;
				}
			}
		}

		return false;
	}

	protected loadIcon() {
		/*this._icon = this._manager.game.add.graphics(0, 0);

		this._icon.beginFill(0, 0.2);
		this._icon.drawCircle(0, 0, Action.ICON_SIZE + 15);
		this._icon.drawCircle(0, 0, Action.ICON_SIZE + 10);
		this._icon.drawCircle(0, 0, Action.ICON_SIZE + 5);
		this._icon.endFill();*/
	}
}