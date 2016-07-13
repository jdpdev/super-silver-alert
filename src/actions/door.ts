export interface IDoorAction {

	/** @type {boolean} Is the door is locked? */
	isLocked: boolean;

	/** @type {number} Id of the item that can unlock the door, if applicable */
	keyId: number;
}