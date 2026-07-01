import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { setComplexity, setMood, setPalette, setSeed } from '../../stores/ui/actions';
import { useComplexity, useMood, usePalette, useSeed } from '../../stores/ui/selectors';

const MOOD_OPTIONS = [
  { label: 'Organic', value: 'organic' },
  { label: 'Geometric', value: 'geometric' },
  { label: 'Calm', value: 'calm' },
  { label: 'Energetic', value: 'energetic' },
];

const PALETTE_OPTIONS = [
  { label: 'Iridescent Opal', value: 'iridescent_opal' },
  { label: 'Neon Cyber', value: 'neon_cyber' },
  { label: 'Biomorphic Flesh', value: 'biomorphic_flesh' },
  { label: 'Volcanic Magma', value: 'volcanic_magma' },
  { label: 'Deep Ocean', value: 'deep_ocean' },
];

function useSeedControls(): ControlSection {
  const seed = useSeed();
  const complexity = useComplexity();
  const mood = useMood();
  const palette = usePalette();

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

  const moodControl: Control = {
    id: 'mood',
    label: 'Mood',
    type: 'select',
    value: mood,
    options: MOOD_OPTIONS,
    onChange: (v: string) => setMood(v),
  };

  const paletteControl: Control = {
    id: 'palette',
    label: 'Palette',
    type: 'select',
    value: palette,
    options: PALETTE_OPTIONS,
    onChange: (v: string) => setPalette(v),
  };

  return {
    id: 'seed',
    label: 'Seed',
    controls: [seedControl, complexityControl, moodControl, paletteControl]
  };
}

export { useSeedControls };
