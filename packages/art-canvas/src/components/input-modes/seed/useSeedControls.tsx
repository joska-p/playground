import { ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Input, Select, Slider } from '@repo/ui/data-entry';
import { setComplexity, setMood, setPalette, setSeed } from '../../../stores/ui/actions';
import { useComplexity, useMood, usePalette, useSeed } from '../../../stores/ui/selectors';

const MOOD_OPTIONS = [
  { label: 'Organic', value: 'organic' },
  { label: 'Geometric', value: 'geometric' },
  { label: 'Calm', value: 'calm' },
  { label: 'Energetic', value: 'energetic' }
];

const PALETTE_OPTIONS = [
  { label: 'Iridescent Opal', value: 'iridescent_opal' },
  { label: 'Neon Cyber', value: 'neon_cyber' },
  { label: 'Biomorphic Flesh', value: 'biomorphic_flesh' },
  { label: 'Volcanic Magma', value: 'volcanic_magma' },
  { label: 'Deep Ocean', value: 'deep_ocean' }
];

function SeedControls() {
  const seed = useSeed();
  const complexity = useComplexity();
  const mood = useMood();
  const palette = usePalette();

  return (
    <ControlSection
      title="Seed"
      defaultOpen
    >
      <ControlRow label="Seed">
        <Input
          value={seed}
          onChange={(e) => {
            setSeed(e.target.value);
          }}
        />
      </ControlRow>
      <ControlRow label="Complexity">
        <Slider
          value={complexity}
          onChange={(e) => {
            setComplexity(Number(e.target.value));
          }}
          min={1}
          max={5}
        />
      </ControlRow>
      <ControlRow label="Mood">
        <Select
          value={mood}
          onChange={(e) => {
            setMood(e.target.value);
          }}
        >
          {MOOD_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </Select>
      </ControlRow>
      <ControlRow label="Palette">
        <Select
          value={palette}
          onChange={(e) => {
            setPalette(e.target.value);
          }}
        >
          {PALETTE_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </Select>
      </ControlRow>
    </ControlSection>
  );
}

export { SeedControls };
