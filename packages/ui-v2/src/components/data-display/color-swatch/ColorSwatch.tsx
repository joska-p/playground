import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../lib/cn';

type ColorSwatchSize = 'sm' | 'md';

const sizeMap: Record<ColorSwatchSize, { box: string; name: string }> = {
  sm: { box: 'size-7 rounded', name: 'text-xs' },
  md: { box: 'size-9 shrink-0 rounded-md', name: 'text-xs font-medium' }
};

type ColorSwatchProps = {
  color: string;
  name: string;
  token?: string;
  size?: ColorSwatchSize;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

function ColorSwatch({
  color,
  name,
  token,
  size = 'md',
  className,
  ref,
  ...props
}: ColorSwatchProps) {
  const styles = sizeMap[size];

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-3 font-mono', className)}
      {...props}
    >
      <div
        className={cn(styles.box, 'shadow-xs')}
        style={{ background: color }}
      />
      <div>
        <p className={cn(styles.name, 'text-foreground')}>{name}</p>
        {token && <p className="text-foreground-muted text-xs">{token}</p>}
      </div>
    </div>
  );
}

export { ColorSwatch };
export type { ColorSwatchProps, ColorSwatchSize };
