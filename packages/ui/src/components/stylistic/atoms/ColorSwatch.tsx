import { cn } from '../../../utils/cn';

type ColorSwatchSize = 'sm' | 'md';

const sizeMap: Record<ColorSwatchSize, { box: string; name: string }> = {
  sm: { box: 'h-7 w-7 rounded', name: 'text-foreground-dim text-xs' },
  md: { box: 'h-9 w-9 shrink-0 rounded-md', name: 'text-foreground text-xs font-medium' }
};

type ColorSwatchProps = {
  color: string;
  name: string;
  token?: string;
  size?: ColorSwatchSize;
};

function ColorSwatch({ color, name, token, size = 'md' }: ColorSwatchProps) {
  const styles = sizeMap[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(styles.box)}
        style={{ background: color }}
      />
      <div>
        <p className={styles.name}>{name}</p>
        {token && <p className="text-foreground-dim text-xs">{token}</p>}
      </div>
    </div>
  );
}

export { ColorSwatch };
export type { ColorSwatchProps, ColorSwatchSize };
