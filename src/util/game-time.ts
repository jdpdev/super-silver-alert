import {GameManager} from "../states/game-manager";

export class GameTime {

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
			add = (hour * 3600 + minute) - (curHour * 3600 - curMin);
		}

		// Advance to the next day
		else {
			add = (hour * 3600 + minute) + (86400 - (curHour * 3600 - curMin));
		}

		this._totalTime += add;
	}

	toString(): string {
		var mins = "";

		if (this.minute < 10) {
			mins = `0${this.minute}`;
		} else {
			mins = `${this.minute}`;
		}

		return `Day ${this.day}, ${this.hour}:${mins}`;
	}
}