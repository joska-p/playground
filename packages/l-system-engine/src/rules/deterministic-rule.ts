import type { LSymbol, Rule, Word } from '../types';

export function deterministicRule(name: string, production: Word): Rule {
    return {
        match(sym: LSymbol): boolean {
            return sym.name === name;
        },
        apply(): Word {
            return production;
        }
    };
}
