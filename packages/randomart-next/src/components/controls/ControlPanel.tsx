import type { ColorSpaceId } from '@repo/randomart-engine-next/types';
import { ControlGrid, ControlSection, ControlPanel as Panel } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { setColorSpace, setMode } from '../../stores/randomart/actions/config';
import { useColorSpace, useMode } from '../../stores/randomart/selectors';
import type { Mode } from '../../stores/randomart/types';
import { TestModeControls } from '../testMode/TestModeControls';
import { AnimationSection } from './AnimationSection';
import { ConfigSection } from './ConfigSection';
import { GrammarSection } from './GrammarSection';

const modeOptions = [
  { value: 'play', label: 'Play' },
  { value: 'test', label: 'Test' }
] as const;

const COLOR_SPACES: { id: ColorSpaceId; label: string }[] = [
  { id: 'srgb', label: 'sRGB' },
  { id: 'oklch', label: 'OKLCH' },
  { id: 'oklab', label: 'OKLab' },
  { id: 'hsl', label: 'HSL' }
];

function ModeSelect() {
  const mode = useMode();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as Mode);
  };

  return (
    <select
      value={mode}
      onChange={handleOnChange}
    >
      {modeOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

function ColorSpaceSection() {
  const activeSpace = useColorSpace();

  return (
    <ControlSection
      title="color space"
      defaultOpen={false}
    >
      <ControlGrid columns={4}>
        {COLOR_SPACES.map((cs) => (
          <Button
            size="sm"
            key={`color-space-${cs.id}`}
            variant={activeSpace === cs.id ? 'accent' : 'default'}
            onClick={() => {
              setColorSpace(cs.id);
            }}
          >
            {cs.label}
          </Button>
        ))}
      </ControlGrid>
    </ControlSection>
  );
}

function PlayModeControlPanel() {
  return (
    <>
      <ConfigSection />
      <GrammarSection />
      <ColorSpaceSection />
      <AnimationSection />
    </>
  );
}

function ControlPanel() {
  const mode = useMode();

  return (
    <Panel title={<ModeSelect />}>
      {mode === 'play' ? <PlayModeControlPanel /> : null}{' '}
      {mode === 'test' ? <TestModeControls /> : null}
    </Panel>
  );
}

export { ControlPanel };
