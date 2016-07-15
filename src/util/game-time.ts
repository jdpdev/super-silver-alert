import {GameManager} from "../states/game-manager";

/**
 * The current game date and time
 */
export class GameTimeManager {

	/** @type {number} Internal clock time the timer started at  */
	private _startTime: number = 0;

	/** @type {number} Number of game seconds per real second */
	private _rate: number = 0;

	/** @type {number} Number of seconds to offset the natural time by */
	private _offsetSeconds: number = 0;

	//private _currentDate:GameDate = null;

	constructor(private _game: GameManager, rate: number) {
		this._startTime = this._game.time.totalElapsedSeconds();
		this._rate = rate;
	}

	update(delta: number) {
		//console.log(`The time is ${this.date}`);
	}

	get elapsedSeconds(): number {
		return (this._game.time.totalElapsedSeconds() - this._startTime + this._offsetSeconds) * this._rate;
	}

	get date(): GameDate {
		return new GameDate(this.elapsedSeconds);
	}

	/**
	 * Advance the current time by a certain amount of seconds
	 * @param  {number}   seconds The number of seconds to advance by, in game time
	 */
	advanceSeconds(seconds: number) {
		this._offsetSeconds += seconds / this._rate;
	}

	advanceToDate(date: GameDate) {
		this._offsetSeconds += (date.time - this.elapsedSeconds) / this._rate;
	}
}

/**
 * A specific day and time in game time
 */
export class GameDate {
	constructor(private _totalTime: number) {
		
	}

	/** Total number of elapsed seconds */
	get time(): number {
		return this._totalTime;
	}

	/** Returns the current game day */
	get day(): number {
		return Math.floor(this._totalTime / 86400);
	}

	/** Returns the current game hour, in 24-hour format */
	get hour(): number {
		return Math.floor(this._totalTime / 3600) % 24;
	}

	/** Returns the current game minute */
	get minute(): number {
		return Math.floor(this._totalTime / 60) % 60;
	}

	/**
	 * Advance the date to a given time. The date will wrap to the next day if an earlier time is given.
	 * @param {number}    hour   The hour to advance to
	 * @param {number}    minute The minute to advance to
	 */
	advanceTo(hour: number, minute: number) {
		var curHour = this.hour;
		var curMin = this.minute;
		var add: number = 0;

		// Simple advance within same day
		if (hour > curHour || (hour == curHour && minute >= curMin)) {
			add = (hour * 3600 + minute * 60) - (curHour * 3600 + curMin * 60);
		}

		// Advance to the next day
		else {
			add = (hour * 3600 + minute * 60) + (86400 - (curHour * 3600 + curMin * 60));
		}

		//console.log(`${this.day} ${this.hour}:${this.minute}`);
		//console.log(`advance before ${this.toString()} (${this._totalTime})`);
		this._totalTime += add;
		//console.log(`advance after ${this.toString()} (+${add} = ${this._totalTime})`);
	}

	toString(): string {
		var mins = "";

		if (this.minute < 10) {
			mins = `0${this.minute}`;
		} else {
			mins = `${this.minute}`;
		}

		return `Day ${this.day + 1}, ${this.hour}:${mins}`;
	}

	/**
	 * Returns if the time of the day is between two times
	 * @param  {GameTime} min The lower bound
	 * @param  {GameTime} max The upper bound
	 * @return {boolean}      Whether the time lies between the two bounds
	 */
	between(min: GameTime, max: GameTime): boolean {
		var nowHour = this.hour;
		var nowMin = this.minute;

		return (min.hour <= nowHour && nowHour <= max.hour) && (min.minute <= nowMin && nowMin <= max.minute);
	}
}

export class GameTime {
	constructor(private _hour: number, private _minute: number) {

	}

	get hour(): number {
		return this._hour;
	}

	get minute(): number {
		return this._minute;
	}

	toString(): string {
		var minute = this._minute < 10 ? `0${this._minute}` : `${this._minute}`;
		return `${this._hour}:${minute}`;
	}
}