/** Context provided to a sequence rule when computing its next term. */
export type NextStepOptions = {
    /** Current term index (1-based for terms after the initial 0). */
    index: number;
    /** Most recently computed term value. */
    current: number;
    /** Complete array of generated terms so far. */
    sequence: number[];
    /** Set of all unique terms produced so far. */
    seen: Set<number>;
    /** Optional seed string for deterministic variation. */
    seed?: string;
};

/** Definition contract for a mathematical sequence rule. */
export type SequenceRule<TId extends string = string, TName extends string = string> = {
    /** Human-readable display name. */
    name: TName;
    /** Unique rule identifier string. */
    id: TId;
    /** Short summary of how the rule operates. */
    description: string;
    /** Maximum recommended step count (0 for uncapped). */
    maxSteps: number;
    /** Function computing the next term given current context. */
    getNext: (options: NextStepOptions) => number;
};
