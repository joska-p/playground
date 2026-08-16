/** Positional — a symbol's params are identified by order, not name. */
export type Parameter = number;

export type LSymbol = {
    readonly name: string;
    readonly params: readonly Parameter[];
    readonly metadata?: Readonly<Record<string, unknown>>;
};

export type Word = readonly LSymbol[];

export type Context = {
    readonly word: Word;
    readonly index: number;
    /** Same seed → same sequence. */
    readonly random: () => number;
};

export type Rule = {
    /** Rules are tried in order — the first match wins. */
    match(symbol: LSymbol, context: Context): boolean;

    apply(symbol: LSymbol, context: Context): Word;
};

export type Grammar = {
    readonly axiom: Word;
    readonly rules: readonly Rule[];
    /** Default 'keep' — unmatched symbols pass through unchanged. */
    readonly unmatchedSymbol?: 'keep' | 'remove';
};

export type ValidationError = {
    readonly code: string;
    readonly message: string;
};

export type ExpandOptions = {
    /** Same seed → same output. */
    readonly seed?: number;
};
