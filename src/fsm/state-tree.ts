/// reference path="state-leaf.ts"
/// <reference path="../../node_modules/strongly-typed-events/strongly-typed-events.d.ts" />

import {LeafDef, Leaf} from "./state-leaf";

//export namespace FSM {
	type TreeDef = { name: string, default: string, nodes: LeafDef[] };

	export class Tree {
		private _name: string;

		get name(): string {
			return this._name;
		}

		private _leaves: Leaf[];

		private _currentLeaf: Leaf;

		private _onStateTransition = new EventDispatcher<Tree, string>();

		constructor(def: TreeDef) {
			this._name = def.name;
			this._leaves = [];

			for (let leafDef of def.nodes) {
				let leaf = new Leaf(this, leafDef);
				this._leaves.push(leaf);

				if (leafDef.name == def.default) {
					this._currentLeaf = leaf;
				}
			}
		}

		static create(game:Phaser.Game, name: string):Tree {
			var def: TreeDef = game.cache.getJSON(name);

			if (def == null) {
				return null;
			}

			return new Tree(def);
		}

		get currentLeaf(): Leaf {
			return this._currentLeaf;
		}

		setInput(key: string, value: any) {
			this._currentLeaf.setInput(key, value);
		}

		/**
		 * Transition to a new state
		 * @param {string} name The name of the state to transition to
		 */
		transitionToState(name: string) {
			for (let leaf of this._leaves) {
				if (leaf.name == name) {
					this._currentLeaf = leaf;
					return;
				}
			}
		}
	}
//}