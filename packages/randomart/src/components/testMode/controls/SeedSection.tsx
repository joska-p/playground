import { ControlSection } from '@repo/ui/control-panel';
import { Input } from '@repo/ui/data-entry';
import { rerollGlobalSeed, setSeed, useSeed } from '../store';

export function SeedSection() {
  const seed = useSeed();

  return (
    <ControlSection title="Global Seed" defaultOpen>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={seed}
          onChange={(e) => {
            setSeed(Number(e.target.value));
          }}
          className="w-24"
        />
        <button
          onClick={rerollGlobalSeed}
          className="rounded border border-neutral-600 px-2 py-1 text-xs text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
        >
          ↻ reroll all
        </button>
      </div>
    </ControlSection>
  );
}
