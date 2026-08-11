export type NextStepOptions = {
    index: number;
    current: number;
    sequence: number[];
    seen: Set<number>;
    seed?: string;
};

export type SequenceRule<TId extends string = string, TName extends string = string> = {
    name: TName;
    id: TId;
    description: string;
    maxSteps: number;
    getNext: (options: NextStepOptions) => number;
};
