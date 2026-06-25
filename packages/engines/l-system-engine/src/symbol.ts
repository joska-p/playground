import type { LSymbol, Parameter } from './types';

/**
 * Creates an LSymbol with no metadata.
 *
 * @example
 * symbol('F')          // { name: 'F', params: [] }
 * symbol('F', 1.0)     // { name: 'F', params: [1.0] }
 */
export function symbol(name: string, ...params: Parameter[]): LSymbol {
  return { name, params };
}

/**
 * Creates an LSymbol with attached metadata.
 * Metadata is an opaque bag of plain values — the engine never reads it.
 *
 * @example
 * symbolWithMeta('F', { shader: 'bark-thick', roughness: 0.8 }, 1.0)
 */
export function symbolWithMeta(
  name: string,
  metadata: Readonly<Record<string, unknown>>,
  ...params: Parameter[]
): LSymbol {
  return { name, params, metadata };
}
