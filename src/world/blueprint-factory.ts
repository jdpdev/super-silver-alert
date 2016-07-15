import {Blueprint, Corridor, EssentialChunk} from "./blueprints";
import {GameTime} from "../util/game-time";

export class ConnectionDef {
	constructor(public destination: EssentialChunk|number, public openTime:GameTime, public closeTime:GameTime) { }

	get chunkId(): number {
		if (typeof this.destination === "number") {
			return <number>this.destination;
		} else {
			return (<EssentialChunk>this.destination).id;
		}
	}

	get data():ChunkDef {
		if (typeof this.destination === "number") {
			return null;
		} else {
			return (<EssentialChunk>this.destination).data;
		}
	}

	get hasExit(): boolean {
		return this.destination < 0;
	}
}

export type ChunkDef = {
	biome: number,
	color: number,
	deco: {},
	connect: {
		up: ConnectionDef,
		down: ConnectionDef,
		left: ConnectionDef,
		right: ConnectionDef
	}
}

export class BlueprintFactory {

	constructor() {

	}

	generateBlueprint(seed:any):Blueprint {
		var blueprint = new Blueprint();
		this.generateTest(blueprint);

		return blueprint;
	}

	private generateTest(blueprint:Blueprint) {

		/*
			Generates a map with the shape

				A------A
				 B    C
				 |H  L|
				 |I  M|
				 |D--D|
				 |J  N|
				 |K  O|
				 bE--E+F-----f
				      | 
				      | 
				  G--G|
				  	  C 

			A is a reception area with the main exit (a)
			B and C are contained corridors
			D is a patio
			E is a nurse station
			F is a corridor with an exit (f)
			G is a common area
		 */
		
		blueprint.setStart(1, 12);
		
		var A = blueprint.createCorridor("Reception");
		var B = blueprint.createCorridor("West Wing");
		var C = blueprint.createCorridor("Main Wing");
		var D = blueprint.createCorridor("Atrium");
		var E = blueprint.createCorridor("Nursing");
		var F = blueprint.createCorridor("East Wing");
		var G = blueprint.createCorridor("Dining");
		var H = blueprint.createCorridor("Smith");
		var I = blueprint.createCorridor("Adams");
		var J = blueprint.createCorridor("Johns");
		var K = blueprint.createCorridor("MacLeod");
		var L = blueprint.createCorridor("Anderson");
		var M = blueprint.createCorridor("Lee");
		var N = blueprint.createCorridor("Kane");
		var O = blueprint.createCorridor("Thor");

		// Populate
		// ...Reception area
		for (var i = 0; i < 7; i++) {
			var data:any = {
				biome: 0,
				color: 0xc700c7,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				},
				deco: {}
			};

			// Escape
			if (i == 0) {
				data.connect.left = new ConnectionDef(-1, new GameTime(7, 0), new GameTime(21, 0));	// Main entrance
			}

			// Deco
			if (2 <= i && i <= 4) {
				data.deco["reception"] = true;
			}

			A.createChunk(data);
		}

		// ...Corridor B
		for (var i = 0; i < 8; i++) {
			data = {
				biome: 1,
				color: 0x0000c7,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				}
			};

			if (i == 7) {
				data.connect.right = new ConnectionDef(-2, null, null); // Emergency exit
			}

			B.createChunk(data);
		}

		// ...Corridor C
		for (var i = 0; i < 11; i++) {
			data = {
				biome: 1,
				color: 0x00c700,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				}
			};

			C.createChunk(data);
		}

		// ...Corridor F
		for (var i = 0; i < 7; i++) {
			data = {
				biome: 1,
				color: 0xc70000,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				}
			};

			if (i == 6) {
				data.connect.right = new ConnectionDef(-2, null, null); // emergency exit
			}

			F.createChunk(data);
		}

		// ...D
		for (var i = 0; i < 3; i++) {
			data = {
				biome: 2,
				color: 0x00c7c7,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				}
			};

			D.createChunk(data);
		}

		// ...E
		for (var i = 0; i < 3; i++) {
			data = {
				biome: 3,
				color: 0xc7c700,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				}
			};

			E.createChunk(data);
		}

		// ...G
		for (var i = 0; i < 4; i++) {
			data = {
				biome: 4,
				color: 0xc7c7c7,
				connect: {
					up: null,
					down: null,
					left: null,
					right: null
				}
			};

			G.createChunk(data);
		}

		// ...rooms
		for (var i = 0; i < 2; i++) {
			data = {
				biome: 5,
				color: null,
				connect: { up: null, down: null, left: null, right: null }
			};

			if (i == 0) {
				data.deco = { table: true };
			} else {
				data.deco = { bed: true };
			}

			H.createChunk(JSON.parse(JSON.stringify(data)));
			I.createChunk(JSON.parse(JSON.stringify(data)));
			J.createChunk(JSON.parse(JSON.stringify(data)));
			K.createChunk(JSON.parse(JSON.stringify(data)));
			L.createChunk(JSON.parse(JSON.stringify(data)));
			M.createChunk(JSON.parse(JSON.stringify(data)));
			N.createChunk(JSON.parse(JSON.stringify(data)));
			O.createChunk(JSON.parse(JSON.stringify(data)));
		}

		// Create links
		this.forgeLink(A, 4, "up", B, 0, "left");
		this.forgeLink(A, 1, "up", C, 10, "right");
		this.forgeLink(B, 3, "up", D, 0, "left");
		this.forgeLink(C, 7, "up", D, 2, "right");
		this.forgeLink(B, 6, "up", E, 0, "left");
		this.forgeLink(C, 4, "up", E, 2, "right");
		this.forgeLink(C, 4, "down", F, 0, "left");
		this.forgeLink(C, 1, "up", G, 3, "right");

		// ...rooms
		this.forgeLink(B, 1, "up", H, 0, "down");
		this.forgeLink(B, 2, "up", I, 0, "down");
		this.forgeLink(B, 4, "up", J, 0, "down");
		this.forgeLink(B, 5, "up", K, 0, "down");

		this.forgeLink(C, 9, "up", L, 1, "down");
		this.forgeLink(C, 8, "up", M, 1, "down");
		this.forgeLink(C, 6, "up", N, 1, "down");
		this.forgeLink(C, 5, "up", O, 1, "down");
	}

	private forgeLink(a: Corridor, aid: number, adir: string, b: Corridor, bid: number, bdir: string) {
		a.getChunkInOrder(aid).data.connect[adir] = new ConnectionDef(b.getChunkInOrder(bid), null, null);
		b.getChunkInOrder(bid).data.connect[bdir] = new ConnectionDef(a.getChunkInOrder(aid), null, null);
	}
}