import {Chunk} from "../chunk"

export class CorridorChunk extends Chunk {

	static _wallColor: number = 0xf5e8d6;
	static _doorFrameColor: number = 0xF5F5DC;
	static _metalColor: number = 0xd3d3d3;

	private _backWall: Phaser.Graphics = null;
	private _ceiling: Phaser.Graphics = null;
	private _floor: Phaser.Graphics = null;

	draw() {
		this.drawCeiling();

		if (this._data.connect.down) {
			this.drawConnectingFloor();
		} else {
			this.drawFloor();
		}

		if (this._data.connect.up) {
			if (this._data.connect.up.data.biome == 2) {
				this.drawOutdoorDoorWall();
			} else {
				this.drawCorridorDoorWall();
			}
		} else {
			this.drawWall();
		}

		if (this._previous == null) {
			this.drawLeftCap();

			if (this._data.connect.left) {
				this.drawLeftCapDoor();
			}
		}
	}

	protected drawWall() {
		this._backWall = this._game.add.graphics(0, 200, this._container);
		this._backWall.beginFill(CorridorChunk._wallColor);
		this._backWall.drawRect(0, 0, 400, 200);
		this._backWall.endFill();

		this._backWall.beginFill(<number>this._data.color);
		this._backWall.drawRect(0, 150, 400, 25);
		this._backWall.endFill();
	}

	// A door between corridors
	protected drawCorridorDoorWall() {
		this.drawWall();

		// doorframe
		this._backWall.beginFill(CorridorChunk._doorFrameColor);
		this._backWall.drawRect(100, 50, 200, 150);
		this._backWall.endFill();

		// doors
		this._backWall.beginFill(0xd3a15f);
		this._backWall.drawRect(110, 60, 88, 140);
		this._backWall.drawRect(202, 60, 88, 140);
		this._backWall.endFill();

		this._backWall.beginFill(0x785221);
		this._backWall.drawRect(198, 60, 4, 140);
		this._backWall.endFill();
	}

	protected drawOutdoorDoorWall() {
		this.drawWall();

		// doorframe
		this._backWall.beginFill(CorridorChunk._doorFrameColor);
		this._backWall.drawRect(100, 50, 200, 150);
		this._backWall.endFill();

		// doors
		this._backWall.beginFill(CorridorChunk._metalColor);
		this._backWall.drawRect(110, 60, 180, 140);
		this._backWall.endFill();

		this._backWall.beginFill(0x66c2ff);
		this._backWall.drawRect(120, 70, 70, 120);
		this._backWall.drawRect(210, 70, 70, 120);
		this._backWall.endFill();
	}

	protected drawCeiling() {
		this._ceiling = this._game.add.graphics(0, 150, this._container);
		this._ceiling.beginFill(0x777a77);
		this._ceiling.drawRect(0, 0, 400, 50);
		this._ceiling.endFill();

		this._ceiling.beginFill(0xffffd7);
		for (var i = 0; i < 2; i++) {
			//this._ceiling.drawRect(i * 200 + 20, 10, 100, 10);
			//this._ceiling.drawRect(i * 200 + 25, 30, 90, 10);
			
			this._ceiling.drawPolygon(
				[
					new Phaser.Point(i * 200 + 20, 		 10),
					new Phaser.Point(i * 200 + 20 + 100, 10),
					new Phaser.Point(i * 200 + 20 + 90,  20),
					new Phaser.Point(i * 200 + 20 + 10,  20)
				]
			);
			
			this._ceiling.drawPolygon(
				[
					new Phaser.Point(i * 200 + 30, 		 30),
					new Phaser.Point(i * 200 + 30 + 80,  30),
					new Phaser.Point(i * 200 + 30 + 70,  40),
					new Phaser.Point(i * 200 + 30 + 10,  40)
				]
			);
		}
		this._ceiling.endFill();
	}

	protected drawFloor() {
		this._floor = this._game.add.graphics(0, 400, this._container);
		this._floor.beginFill(0xe7eae7);
		this._floor.drawRect(0, 0, 400, 40);
		this._floor.endFill();

		this._floor.beginFill(0xa7aaa7);
		for (var i = 0; i < 4; i++) {
			this._floor.drawRect(i * 100 + 10, 0, 2, 40);
		}
		this._floor.endFill();
	}

	protected drawConnectingFloor() {
		this._floor = this._game.add.graphics(0, 400, this._container);
		
		this._floor.beginFill(0xe7eae7);
		this._floor.drawRect(0, 0, 400, 80);
		this._floor.endFill();

		this._floor.beginFill(0xa7aaa7);
		for (var i = 0; i < 4; i++) {
			this._floor.drawRect(i * 100 + 10, 0, 2, 40);
		}

		for (var i = 0; i < 2; i++) {
			this._floor.drawRect(0, 40 + i * 150, 400, 2);
		}

		this._floor.endFill();
	}

	protected drawLeftCap() {
		//this._backWall = this._game.add.graphics(0, 200, this._container);
		this._backWall.beginFill(CorridorChunk._wallColor);
		this._backWall.drawPolygon(
			[
				new Phaser.Point(0, -50),
				new Phaser.Point(0, 240),
				new Phaser.Point(30, 200),
				new Phaser.Point(30, 0)
			]
		);
		this._backWall.endFill();

		this._backWall.beginFill(<number>this._data.color);
		this._backWall.drawPolygon(
			[
				new Phaser.Point(0, 140),
				new Phaser.Point(0, 190),
				new Phaser.Point(30, 175),
				new Phaser.Point(30, 150)
			]
		);
		this._backWall.endFill();
	}

	protected drawLeftCapDoor() {
		// doorframe
		this._backWall.beginFill(CorridorChunk._doorFrameColor);

		this._backWall.drawPolygon(
			[
				new Phaser.Point(5, 30),
				new Phaser.Point(5, 230),
				new Phaser.Point(25, 210),
				new Phaser.Point(25, 50)
			]
		);
		this._backWall.endFill();

		// doors
		this._backWall.beginFill(0xd3a15f);
		this._backWall.drawPolygon(
			[
				new Phaser.Point(8, 38),
				new Phaser.Point(8, 229),
				new Phaser.Point(22, 210),
				new Phaser.Point(22, 53)
			]
		);
		this._backWall.endFill();
	}
}