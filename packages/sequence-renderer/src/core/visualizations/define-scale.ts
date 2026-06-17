import type { ScaleCalculator, ScaleDefinition } from './types';

function defineScale<TOptions extends Record<string, unknown>>() {
  return {
    defaults(defaults: TOptions) {
      return {
        calculate(
          fn: (params: {
            sequence: number[];
            containerSize: { width: number; height: number };
            options: TOptions;
          }) => number
        ) {
          return {
            with(overrides: Partial<TOptions> = {}): ScaleCalculator {
              const resolved = { ...defaults, ...overrides };
              return (p: {
                sequence: number[];
                containerSize: { width: number; height: number };
              }) => fn({ ...p, options: resolved });
            }
          } satisfies ScaleDefinition<TOptions>;
        }
      };
    }
  };
}

export { defineScale };
