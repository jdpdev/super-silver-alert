/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>

import {Preloader} from "./preloader";
import {GameManager} from "./states/game-manager";

class Boot {
	private game: Phaser.Game;

	constructor() {
		this.game = new Phaser.Game(800, 600, Phaser.AUTO, "gameContainer", { preload: this.preload, init: this.init, create: this.create });
	}

	init() {
		this.game.state.add("Preload", Preloader);
		this.game.state.add("Game", GameManager);

		if (this.game.device.desktop) {
			this.game.scale.pageAlignHorizontally = true;
		} else {
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(480, 260, 1024, 768);
            this.game.scale.forceLandscape = true;
            this.game.scale.pageAlignHorizontally = true;
		}

		this.game.stage.backgroundColor = 0xa700a7;
	}

	/**
	 * Preload the initial loading graphics
	 */
	preload() {

	}

	/**
	 * Jump to the preloader
	 */
	create() {
		console.log("Boot loaded");
		this.game.state.start("Preload");
	}
}

var booter = new Boot();