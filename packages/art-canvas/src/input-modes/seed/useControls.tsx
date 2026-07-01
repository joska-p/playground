import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setComplexity, setSeed } from '../../stores/ui/actions';
import { useComplexity, useSeed } from '../../stores/ui/selectors';

function useSeedControls(): ControlSection {
  const seed = useSeed();
  const complexity = useComplexity();

  const seedControl: Control = {
    id: 'seed',
    label: 'Seed',
    type: 'text',
    value: seed,
    onChange: (v: string) => setSeed(v)
  };

  const complexityControl: Control = {
    id: 'complexity',
    label: 'Complexity',
    type: 'number',
    min: 1,
    max: 5,
    value: complexity,
    onChange: (v: number) => setComplexity(v)
  };

  return {
    id: 'seed',
    label: 'Seed',
    controls: [seedControl, complexityControl]
  };
}

export { useSeedControls };
