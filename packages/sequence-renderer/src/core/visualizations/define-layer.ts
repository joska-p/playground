import type { DrawingContext } from './types';

function defineLayer<TOptions extends Record<string, unknown>>() {
  return {
    defaults(defaults: TOptions) {
      return {
        draw(drawFn: (context: DrawingContext, options: TOptions) => void) {
          return {
            with(overrides: Partial<TOptions> = {}) {
              const resolved = { ...defaults, ...overrides };
              return (context: DrawingContext) => {
                context.context.save();
                drawFn(context, resolved);
                context.context.restore();
              };
            }
          };
        }
      };
    }
  };
}

export { defineLayer };
