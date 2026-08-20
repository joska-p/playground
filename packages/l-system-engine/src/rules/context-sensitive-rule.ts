import type { Context, LSymbol, Rule, Word } from '../types';

export type ContextSensitiveOptions = {
    readonly name: string;
    readonly leftContext?: string;
    readonly rightContext?: string;
    /** For parametric rules, use `parametricRule` instead. */
    readonly produce: Word;
    /**
     * Symbols skipped when scanning for context neighbors. Defaults to `[`, `]` — the Prusinkiewicz
     * standard.
     */
    readonly ignoreBrackets?: boolean;
};

const DEFAULT_IGNORED = new Set(['[', ']']);

function findLeftNeighbor(word: Word, index: number, ignored: ReadonlySet<string>): LSymbol | null {
    for (let i = index - 1; i >= 0; i--) {
        const sym = word[i];
        if (!ignored.has(sym.name)) return sym;
    }
    return null;
}

function findRightNeighbor(
    word: Word,
    index: number,
    ignored: ReadonlySet<string>
): LSymbol | null {
    for (let i = index + 1; i < word.length; i++) {
        const sym = word[i];
        if (!ignored.has(sym.name)) return sym;
    }
    return null;
}

export function contextSensitiveRule(options: ContextSensitiveOptions): Rule {
    const ignored: ReadonlySet<string> =
        options.ignoreBrackets === false ? new Set() : DEFAULT_IGNORED;

    return {
        match(sym: LSymbol, context: Context): boolean {
            if (sym.name !== options.name) return false;

            if (options.leftContext !== undefined) {
                const left = findLeftNeighbor(context.word, context.index, ignored);
                if (left?.name !== options.leftContext) return false;
            }

            if (options.rightContext !== undefined) {
                const right = findRightNeighbor(context.word, context.index, ignored);
                if (right?.name !== options.rightContext) return false;
            }

            return true;
        },
        apply(): Word {
            return options.produce;
        }
    };
}
