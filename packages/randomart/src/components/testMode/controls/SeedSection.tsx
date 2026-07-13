import { ControlSection } from '@repo/ui/control-panel';
import { Button, Input } from '@repo/ui/data-entry';
import { rerollGlobalSeed, setSeed, useSeed } from '../store';

export function SeedSection() {
  const seed = useSeed();

  return (
    <ControlSection
      title="Global Seed"
      defaultOpen
    >
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={seed}
          onChange={(e) => {
            setSeed(Number(e.target.value));
          }}
          className="w-24"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={rerollGlobalSeed}
          className="text-xs"
        >
          reroll all
        </Button>
      </div>
    </ControlSection>
  );
}
