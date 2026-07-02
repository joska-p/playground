import { cva } from 'class-variance-authority';

export function createVariant<V extends Record<string, Record<string, string>>>(config: {
  base: string;
  variants: V;
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
}) {
  const { base, variants, defaultVariants } = config;
  return cva<V>(base, { variants, defaultVariants } as Parameters<typeof cva<V>>[1]);
}
