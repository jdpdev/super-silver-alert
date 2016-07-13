import {GameManager} from "../../states/game-manager";

export class RestrictionResponse {
	constructor (private _type: any, private _isRestricted: boolean, private _notification: string) { }

	get type(): any {
		return this._type;
	}

	get isRestricted(): boolean {
		return this._isRestricted;
	}

	get notificaiton(): string {
		return this._notification;
	}
}

export abstract class Restriction {
	abstract isRestricted(manager: GameManager): RestrictionResponse;
}