/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>

export class Preloader extends Phaser.State {
	constructor() {
		super();
	}

	init() {

	}

	preload() {

	}

	create() {
		console.log("Preloader loaded");
		this.game.stage.backgroundColor = 0x0000a7;

		this.game.state.start("Game");
	}
}