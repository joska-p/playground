import { useMaxDepth, useSeedText } from '../../stores/randomart/selectors';

export function SeedInfo() {
  const seedText = useSeedText();
  const maxDepth = useMaxDepth();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          Seed Text
        </h4>
        <div className="bg-card text-utility-1 rounded-sm px-3 py-2 text-sm font-bold break-all">
          {seedText}
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          Max Depth
        </h4>
        <div className="border-border/60 bg-card text-utility-4 rounded-lg border px-3 py-2 font-mono text-sm font-bold">
          {maxDepth}
        </div>
      </div>
    </div>
  );
}
