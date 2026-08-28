/** Positional — a symbol's params are identified by order, not name. */
export type Parameter = number;

export interface LSymbol {
    readonly name: string;
    readonly params: readonly Parameter[];
    readonly metadata?: Readonly<Record<string, unknown>>;
}

export type Word = readonly LSymbol[];

export interface Context {
    readonly word: Word;
    readonly index: number;
    /** Same seed → same sequence. */
    readonly random: () => number;
}

export interface Rule {
    /** Rules are tried in order — the first match wins. */
    match(symbol: LSymbol, context: Context): boolean;

    apply(symbol: LSymbol, context: Context): Word;
}

export interface Grammar {
    readonly axiom: Word;
    readonly rules: readonly Rule[];
    /** Default 'keep' — unmatched symbols pass through unchanged. */
    readonly unmatchedSymbol?: 'keep' | 'remove';
}

export interface ValidationError {
    readonly code: string;
    readonly message: string;
}

export interface ExpandOptions {
    /** Same seed → same output. */
    readonly seed?: number;
}
