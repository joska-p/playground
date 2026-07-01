import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setDepth, setSeed } from '../../../stores/ui/actions';
import { useDepth, useSeed } from '../../../stores/ui/selectors';

function useFromSeedSection(): ControlSection {
  const seed = useSeed();
  const depth = useDepth();

  const seedControl: Control = {
    id: 'seed',
    label: 'Seed',
    type: 'text',
    value: seed,
    onChange: (v: string) => setSeed(v)
  };

  const depthControl: Control = {
    id: 'depth',
    label: 'Depth',
    type: 'number',
    min: 1,
    max: 5,
    value: depth,
    onChange: (v: number) => setDepth(v)
  };

  return {
    id: 'from-seed',
    label: 'From Seed',
    controls: [seedControl, depthControl]
  };
}

export { useFromSeedSection };
