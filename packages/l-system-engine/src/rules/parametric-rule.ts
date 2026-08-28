import type { LSymbol, Parameter, Rule, Word } from '../types';

export interface ParametricOptions {
    readonly name: string;
    readonly guard?: (params: readonly Parameter[]) => boolean;
    readonly produce: (params: readonly Parameter[]) => Word;
}

export function parametricRule(options: ParametricOptions): Rule {
    return {
        match(sym: LSymbol): boolean {
            if (sym.name !== options.name) return false;

            if (options.guard !== undefined && !options.guard(sym.params)) return false;

            return true;
        },
        apply(sym: LSymbol): Word {
            return options.produce(sym.params);
        }
    };
}
