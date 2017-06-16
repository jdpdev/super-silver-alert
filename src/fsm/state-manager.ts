import {Tree} from "./state-tree"

export class StateManager {
	private static _instance: StateManager;

	/** List of tree files to load */
	private _cachedTrees: string[];

	/** Compiled trees */
	private _trees: Tree[];

	constructor() {
		StateManager._instance = this;
	}

	static getTree(name: string): Tree {
		for (var tree of StateManager._instance._trees) {
			if (tree.name == name) {
				return tree;
			}
		}

		return null;
	}

	loadTree(game:Phaser.Game, name:string) {
		this._cachedTrees = [];

		game.load.json(name, `data/${name}.json`);
		this._cachedTrees.push(name);
	}

	initialize(game: Phaser.Game) {
		this._trees = [];

		for (var name of this._cachedTrees) {
			var tree: Tree = Tree.create(game, name);

			if (tree != null) {
				this._trees.push(tree);
			} else {
				console.error(`Unable to initialize state tree '${name}'`);
			}
		}
	}

	setInput(tree:string, key: string, value: any) {
		for (let tree of this._trees) {
			if (tree.name) {
				tree.setInput(key, value);
			}
		}
	}
}