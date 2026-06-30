import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setSeed } from '../../../stores/ui/actions';
import { useSeed } from '../../../stores/ui/selectors';

function useFromSeedSection(): ControlSection {
  const seed = useSeed();

  const seedControl: Control = {
    id: 'seed',
    label: 'Seed',
    type: 'text',
    value: seed,
    onChange: (v: string) => setSeed(v)
  };

  return {
    id: 'from-seed',
    label: 'From Seed',
    controls: [seedControl]
  };
}

export { useFromSeedSection };
