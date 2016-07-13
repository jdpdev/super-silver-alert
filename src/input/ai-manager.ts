import {Actor} from "../world/actor";
import {Nurse} from "../world/actors/nurse";
import {GameManager} from "../states/game-manager";
import {AIController} from "./ai-controller";

export class AIManager {

	/** @type {AIController[]} All registered AIs */
	private _ais: AIController[] = [];

	private _spawnedAIs: Actor[] = [];

	/** @type {number} The id of the game's current corridor */
	private _currentCorridorId: number = -1;

	/** @type {number} The id of the game's current corridor */
	get location(): number {
		return this._currentCorridorId;
	}

	constructor(private _game: GameManager) {
		for (var i = 0; i < 7; i++) {
			var rand = Math.round(Math.random() * 4) + 1;

			for (var j = 0; j < rand; j++) {
				this._ais.push(new AIController(this._game, i));
			}
		}
	}

	update(delta: number) {
		this._spawnedAIs.forEach((actor) => actor.update(delta));
	}

	/**
	 * Change the current location of the game
	 * Despawn existing ais and spawn new ones
	 * @param {number} id The id of the corridor
	 */
	changeLocation(id: number) {
		this._currentCorridorId = id;

		this._spawnedAIs.forEach((actor) => this._game.removeAI(actor));
		this._spawnedAIs = [];

		for (var i = 0; i < this._ais.length; i++) {
			if (this._ais[i].location != id) {
				continue;
			}

			var actor = new Nurse(this._game.game, null, this._game);
			actor.setController(this._ais[i]);
			this._game.addAI(actor, null);
			this._spawnedAIs.push(actor);
		}
	}

	//escapeAttempt(chunkId: number)

	/**
	 * Spawn an AI
	 */
	protected spawnAI() {

	}
}