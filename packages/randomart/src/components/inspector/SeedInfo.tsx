import {
  useSelectedChoiceCount,
  useSelectedInitialHash
} from '../../stores/randomart/selectors';

export function SeedInfo() {
  const initialHash = useSelectedInitialHash();
  const choiceCount = useSelectedChoiceCount();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          Generated Base Seed
        </h4>
        <div className="bg-card text-utility-1 rounded-sm px-3 py-2 text-sm font-bold">
          #{initialHash}
        </div>
      </div>
      <div>
        <h4 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
          Grammar Steps Used
        </h4>
        <div className="border-border/60 bg-card text-utility-4 rounded-lg border px-3 py-2 font-mono text-sm font-bold">
          {choiceCount} Calls
        </div>
      </div>
    </div>
  );
}
