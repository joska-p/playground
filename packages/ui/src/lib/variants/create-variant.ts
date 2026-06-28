import { cva } from 'class-variance-authority';

export function createVariant<V extends Record<string, Record<string, string>>>(config: {
  base: string;
  variants: V;
  defaultVariants: Record<string, string>;
}) {
  return cva<V>(config.base, {
    variants: config.variants,
    defaultVariants: config.defaultVariants
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}
