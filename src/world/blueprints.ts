/**
 * The master layout of the building, with all of its corridors.
 */
export class Blueprint {
    
    private _corridors: Corrdior[] = [];
    
    /**
     * Create a new corridor instance
     */
    createCorridor(): Corridor {
        var corridor = new Corridor();
        this._corridors.push(corridor);
        
        return corridor;
    }
}

/**
 * A corridor is a single screen, that is, a section of the building that is 
 * loaded all at once. A corridor is made up of chunk definitions, which are
 * descriptions of chunks.
 */
export class Corridor {
    private _chunks: any[] = [];
}