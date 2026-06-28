// ---------------------------------------------------------------------------
// Core data types
// ---------------------------------------------------------------------------

/** A numeric parameter attached to a symbol. Parameters are positional. */
export type Parameter = number;

/** The atomic unit of an L-system word. */
export type LSymbol = {
  readonly name: string;
  readonly params: readonly Parameter[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

/** A sequence of symbols — the state of the grammar at one iteration. */
export type Word = readonly LSymbol[];

/**
 * Information available to a rule during matching and production.
 * The engine constructs a fresh Context for each symbol on each iteration.
 */
export type Context = {
  /** The full current word (read-only). */
  readonly word: Word;
  /** Position of the current symbol in the word. */
  readonly index: number;
  /** Seeded random function — value in [0, 1). Same seed → same sequence. */
  readonly random: () => number;
}

/**
 * The only contract the engine cares about.
 * Every rule type implements this interface.
 */
export type Rule = {
  /**
   * Returns true if this rule applies to the symbol at context.index.
   * The engine calls match() on each rule in order until one returns true.
   */
  match(symbol: LSymbol, context: Context): boolean;

  /**
   * Returns the replacement word for the matched symbol.
   * Only called when match() returned true.
   */
  apply(symbol: LSymbol, context: Context): Word;
}

/** A complete grammar definition — everything the engine needs to expand. */
export type Grammar = {
  readonly axiom: Word;
  readonly rules: readonly Rule[];
  /**
   * What to do when no rule matches a symbol.
   * 'keep' (default) — pass it through unchanged.
   * 'remove'         — drop it from the output.
   */
  readonly unmatchedSymbol?: 'keep' | 'remove';
}

/** A single validation problem found by `validate()`. */
export type ValidationError = {
  readonly code: string;
  readonly message: string;
}

/** Options accepted by `expand` and `steps`. */
export type ExpandOptions = {
  /** Seed for the random number generator. Same seed → same output. */
  readonly seed?: number;
}
