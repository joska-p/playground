import type { VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { colorSwatchBoxVariants, colorSwatchNameVariants } from './colorSwatchVariants';

type ColorSwatchSize = 'sm' | 'md';

type ColorSwatchProps = {
  color: string;
  name: string;
  token?: string;
} & VariantProps<typeof colorSwatchBoxVariants>;

function ColorSwatch({ color, name, token, size = 'md' }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(colorSwatchBoxVariants({ size }))}
        style={{ background: color }}
      />
      <div>
        <p className={cn(colorSwatchNameVariants({ size }))}>{name}</p>
        {token && <p className="text-foreground-dim text-xs">{token}</p>}
      </div>
    </div>
  );
}

export { ColorSwatch };
export type { ColorSwatchProps, ColorSwatchSize };
