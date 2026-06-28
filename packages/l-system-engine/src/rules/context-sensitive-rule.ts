import type { Context, LSymbol, Rule, Word } from '../types';

export interface ContextSensitiveOptions {
  /** Name of the symbol this rule matches. */
  readonly name: string;
  /** Name of the symbol that must immediately precede the matched symbol (ignoring brackets). */
  readonly leftContext?: string;
  /** Name of the symbol that must immediately follow the matched symbol (ignoring brackets). */
  readonly rightContext?: string;
  /**
   * The word to produce when this rule fires.
   * For parametric context-sensitive rules, use `parametricRule` instead.
   */
  readonly produce: Word;
  /**
   * Names of symbols to skip when scanning for context neighbors.
   * Defaults to ['[', ']'] — the Prusinkiewicz standard.
   */
  readonly ignoreBrackets?: boolean;
}

const DEFAULT_IGNORED = new Set(['[', ']']);

/**
 * Finds the nearest non-bracket neighbor to the left of `index`.
 * Returns null when no such neighbor exists.
 */
function findLeftNeighbor(word: Word, index: number, ignored: ReadonlySet<string>): LSymbol | null {
  for (let i = index - 1; i >= 0; i--) {
    const sym = word[i]!;
    if (!ignored.has(sym.name)) return sym;
  }
  return null;
}

/**
 * Finds the nearest non-bracket neighbor to the right of `index`.
 * Returns null when no such neighbor exists.
 */
function findRightNeighbor(
  word: Word,
  index: number,
  ignored: ReadonlySet<string>
): LSymbol | null {
  for (let i = index + 1; i < word.length; i++) {
    const sym = word[i]!;
    if (!ignored.has(sym.name)) return sym;
  }
  return null;
}

/**
 * Matches a symbol by name, optionally checking left and/or right neighbors.
 * Bracket symbols `[` and `]` are skipped during context lookup by default
 * (configurable via `ignoreBrackets: false`).
 *
 * @example
 * contextSensitiveRule({
 *   name: 'a',
 *   leftContext: 'b',
 *   produce: [symbol('b')],
 * })
 */
export function contextSensitiveRule(options: ContextSensitiveOptions): Rule {
  const ignored: ReadonlySet<string> =
    options.ignoreBrackets === false ? new Set() : DEFAULT_IGNORED;

  return {
    match(sym: LSymbol, context: Context): boolean {
      if (sym.name !== options.name) return false;

      if (options.leftContext !== undefined) {
        const left = findLeftNeighbor(context.word, context.index, ignored);
        if (left === null || left.name !== options.leftContext) return false;
      }

      if (options.rightContext !== undefined) {
        const right = findRightNeighbor(context.word, context.index, ignored);
        if (right === null || right.name !== options.rightContext) return false;
      }

      return true;
    },
    apply(_sym: LSymbol, _context: Context): Word {
      return options.produce;
    }
  };
}
