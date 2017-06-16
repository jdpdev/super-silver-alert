import {GameManager} from "../states/game-manager";
import {Player} from "../world/actors/player";
import {Restriction, RestrictionResponse, RestrictionDef} from "./components/restriction";
import {RestrictionFactory} from "./components/restriction-factory"
import {UI} from "../ui/ui"

/** Placeholder for the data loaded externally */
export class ActionDef {
	type: string;
	restrictions: RestrictionDef[];
}

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

	constructor(protected _manager:GameManager, protected _label: string, def: ActionDef) {
		if (def != null) {
			this.buildRestrictions(def);
		}
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

	get isAvailable(): boolean {
		return true;
	}

	/**
	 * Activate the action
	 */
	performAction(instigator: Player, data?:any): Promise<ActionResponse> { 
		this._instigator = instigator;
		return null;
	}

	private buildRestrictions(actionDef: ActionDef) {
		for (var def of actionDef.restrictions) {
			this.addRestriction(RestrictionFactory.getRestriction(def));
		}
	}

	protected addRestriction(restriction: Restriction) {
		if (this._restrictions == null) {
			this._restrictions = [];
		}

		this._restrictions.push(restriction);
	}

	/**
	 * Returns the action's current restriction
	 * @return {RestrictionResponse} 
	 */
	getRestriction(): RestrictionResponse {
		if (this._restrictions) {
			for (var i = 0; i < this._restrictions.length; i++) {
				var response = this._restrictions[i].isRestricted(this._manager);

				if (response.isRestricted) {
					return response;
				}
			}
		}

		return null;
	}

	isRestricted(): boolean {
		var restriction = this.getRestriction();
		return restriction != null && restriction.isRestricted;
	}
}