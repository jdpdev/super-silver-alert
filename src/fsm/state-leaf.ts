/// reference path="state-tree.ts"

import {Tree} from "./state-tree";

//export namespace FSM {
	type RequirementDef = { input: string, value: any };
	type TransitionDef = { name:string, requirements?: RequirementDef[] };
	export type LeafDef = { name:string, transitions?: TransitionDef[] };

	export class Leaf {
		private _name:string;

		get name(): string {
			return this._name;
		}

		/** @type {string[]} List of valid input keys */
		private _inputList:string[] = [];

		/** Received inputs and values */
		private _inputs = {};

		/**
		 * List of possible state transitions with input requirements to transition to that state.
		 */
		private _transitions:Transition[];

		constructor(private _tree: Tree, json: LeafDef) {
			this._name = json.name;
			this._transitions = [];

			if (json.transitions) {
				for (let transition of json.transitions) {
					this._transitions.push(new Transition(transition));
				}
			}
		}

		/**
		 * Set the value of an input in the state
		 * @param {string} key   The input key
		 * @param {any}    value The value to set to
		 */
		setInput(key: string, value: any) {
			this._inputs[key] = value;
			this.checkInputs();
		}

		/**
		 * Returns if a specific input has its requirements met
		 * @param  {string} key   The input key
		 * @param  {any}    value The value to set to
		 * @return {boolean} Whether the input requirement has been met
		 */
		hasInput(key:string, value: any): boolean {
			return this._inputs[key] == value;
		}

		reset() {
			this._inputs = {};
		}

		/**
		 * Checks the requirements for state transition
		 */
		private checkInputs() {
			for (let state of this._transitions) {
				if (state.checkTransition(this._inputs)) {
					this._tree.transitionToState(state.state);
					return;
				}
			}
		}
	}

	class Transition {
		/** @type {string} Name of the state to transition to */
		private _state: string;

		get state(): string {
			return this._state;
		}

		private _requirements: InputRequirement[];

		constructor(def: TransitionDef) {
			this._state = def.name;
			this._requirements = [];

			if (def.requirements) {
				for (let requirement of def.requirements) {
					this._requirements.push(new InputRequirement(requirement));
				}
			}
		}

		checkTransition(inputs: {}): boolean {
			for (let requirement of this._requirements) {
				if (!requirement.inputMet(inputs)) {
					return false;
				}
			}

			return true;
		}
	}

	class InputRequirement {
		private _input: string;
		private _value: any;

		constructor(def: RequirementDef) {
			this._input = def.input;
			this._value = def.value;
		}

		/**
		 * Returns if the requirement has been met
		 * @param  {}  				inputs The map of inputs
		 * @return {boolean}        If the requirement has been met
		 */
		inputMet(inputs):boolean {
			return inputs[this._input] == this._value;
		}
	}
//}