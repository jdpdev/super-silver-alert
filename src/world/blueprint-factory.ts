import {Blueprint, Corridor} from "./blueprints";

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

				A----------a
				 B    C
				 |    |
				 |    |
				 |D--D|
				 |    |
				 |    |
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
		
		var A = blueprint.createCorridor("Reception");
		var B = blueprint.createCorridor("West Wing");
		var C = blueprint.createCorridor("Main Wing");
		var D = blueprint.createCorridor("Atrium");
		var E = blueprint.createCorridor("Nursing");
		var F = blueprint.createCorridor("East Wing");
		var G = blueprint.createCorridor("Dining");

		// Populate
		// ...Reception area
		for (var i = 0; i < 12; i++) {
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
				data.connect.left = -1;
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
				data.connect.right = -1;
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

			/*if (i == 3) {
				data.connect.up = D.id;
			} else if (i == 6) {
				data.connect.up = F.id;
				data.connect.down = E.id;
			} else if (i == 10) {
				data.connect.down = G.id;
			}*/

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
				data.connect.right = -1;
			}

			F.createChunk(data);
		}

		// ...D
		for (var i = 0; i < 4; i++) {
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
		for (var i = 0; i < 4; i++) {
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

		// Create links
		this.forgeLink(A, 11, "up", B, 0, "left");
		this.forgeLink(A, 5, "up", C, 10, "right");
		this.forgeLink(B, 3, "up", D, 0, "left");
		this.forgeLink(C, 7, "up", D, 3, "right");
		this.forgeLink(B, 6, "up", E, 0, "left");
		this.forgeLink(C, 4, "up", E, 3, "right");
		this.forgeLink(C, 4, "down", F, 0, "left");
		this.forgeLink(C, 1, "up", G, 3, "right");
	}

	private forgeLink(a: Corridor, aid: number, adir: string, b: Corridor, bid: number, bdir: string) {
		a.getChunkInOrder(aid).data.connect[adir] = b.getChunkInOrder(bid);
		b.getChunkInOrder(bid).data.connect[bdir] = a.getChunkInOrder(aid);
	}
}