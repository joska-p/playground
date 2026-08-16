import type { LSymbol, Parameter } from './types';

export function symbol(name: string, ...params: Parameter[]): LSymbol {
    return { name, params };
}

/** Metadata is opaque — the engine never reads it. */
export function symbolWithMeta(
    name: string,
    metadata: Readonly<Record<string, unknown>>,
    ...params: Parameter[]
): LSymbol {
    return { name, params, metadata };
}
