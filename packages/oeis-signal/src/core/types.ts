/** Budget / safety limit when creating a signal */
export type Budget = {
    maxTerms: number;
};

/** A lazy signal you can pull from */
export type Signal = {
    /** Pull the next term. Returns { value, done } */
    next(): IteratorResult<number>;

    /** Convenience: materialize up to `count` terms (or until done) */
    take(count: number): number[];

    /** Optional: how many terms have already been produced */
    readonly produced: number;
};

/** Black-box module */
export type Module = {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    /** Create a fresh signal limited by the given budget */
    createSignal(budget: Budget): Signal;
};
