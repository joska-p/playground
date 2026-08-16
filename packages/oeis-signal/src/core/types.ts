export type Budget = {
    maxTerms: number;
};

export type Signal = {
    next(): IteratorResult<number>;

    take(count: number): number[];

    readonly produced: number;
};

export type Module = {
    readonly id: string;
    readonly name: string;
    readonly description: string;

    createSignal(budget: Budget): Signal;
};
