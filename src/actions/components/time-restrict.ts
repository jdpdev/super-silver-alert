import {GameTime} from "../../util/game-time";
import {GameManager} from "../../states/game-manager";
import {Restriction, RestrictionResponse} from "./restriction"

export class TimeRestriction extends Restriction {
	/** @type {GameTime} If locked by time, the time that it opens */
	protected _openStart: GameTime = null;

	/** @type {GameTime} If locked by time, the time that it locks */
	protected _openEnd: GameTime = null;

	constructor(open: GameTime, close: GameTime) {
		super();

		this._openStart = open;
		this._openEnd = close;
	}

	isRestricted(manager: GameManager): RestrictionResponse {
		if (this._openStart == null || this._openEnd == null || manager.gameDate.between(this._openStart, this._openEnd)) {
			return new RestrictionResponse(TimeRestriction, false, "Unlocked");
		} else {
			return new RestrictionResponse(TimeRestriction, true, "Locked.");
		}
	}
}