import {LinkedList, ILinkable} from "../util/linked-list";

/**
 * A corridor is a single screen, that is, a section of the building that is 
 * loaded all at once. A corridor is made up of chunk definitions, which are
 * descriptions of chunks.
 */
export class Corridor {
    private _chunks: LinkedList<EssentialChunk>;
    private static _highId: number = 0;

    get id(): number { return this._id; }
    get first(): EssentialChunk { return this._chunks.first; }

    constructor(private _id: number) {
        this._chunks = new LinkedList<EssentialChunk>();
    }

    createChunk(data:any): EssentialChunk {
        var def = new EssentialChunk(this.getNextId(), data);
        this._chunks.add(def);

        return def;
    }

    private getNextId(): number {
        return Corridor._highId++;
    }

    /**
     * Get the nth chunk in the corridor
     * @param  {number}         n The index of the chunk to get
     * @return {EssentialChunk}   The chunk
     */
    getChunkInOrder(n: number): EssentialChunk {
        if (n < 0 || n >= this._chunks.length) {
            return null;
        }

        var i = 0;
        var iterator = this._chunks.first;

        do {
            if (i == n) {
                return iterator;
            }

            i++;
        } while (iterator = <EssentialChunk>iterator.next)
    }

    /**
     * Returns if the given chunk belongs to this corridor
     * @param  {number}  id The chunk id
     * @return {boolean}    [description]
     */
    hasChunk(id: number): boolean {
        var chunk = this._chunks.first;

        do {
            if (chunk.id == id) {
                return true;
            }
        } while (chunk = <EssentialChunk>chunk.next);

        return false;
    }
}

/**
 * The master layout of the building, with all of its corridors.
 */
export class Blueprint {
    
    private _corridors: Corridor[] = [];
    private _highId: number = 0;
    
    /**
     * Create a new corridor instance
     */
    createCorridor(): Corridor {
        var corridor = new Corridor(this.getNextId());
        this._corridors.push(corridor);
        
        return corridor;
    }

    getCorridor(id: number): Corridor {
        for (var i = 0; i < this._corridors.length; i++) {
            if (this._corridors[i].id == id) {
                return this._corridors[i];
            }
        }

        return null;
    }

    /**
     * Return the corridor that the given chunk id belongs to
     * @param  {number}   id The chunk id
     * @return {Corridor}    The parent corridor
     */
    findChunkCorridor(id: number): Corridor {
        for (var i = 0; i < this._corridors.length; i++) {
            if (this._corridors[i].hasChunk(id)) {
                return this._corridors[i];
            }
        }

        return null;
    }

    private getNextId(): number {
        return this._highId++;
    }
}

export class EssentialChunk implements ILinkable {

    private _next: ILinkable = null;
    private _prev: ILinkable = null;

    get next(): ILinkable { return this._next; }
    set next(value: ILinkable) { this._next = value; }

    get previous(): ILinkable { return this._prev; }
    set previous(value: ILinkable) { this._prev = value; }

    get id(): number { return this._id; }
    get data(): any { return this._data; }

    constructor(private _id: number, private _data:any = null) {
        
    }
}