import { ControlPanel as Panel } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { setMode } from '../../stores/randomart/actions/config';
import { useMode } from '../../stores/randomart/selectors';
import type { Mode } from '../../stores/randomart/types';
import { TestModeControls } from '../testMode/TestModeControls';
import { AnimationSection } from './AnimationSection';
import { ConfigSection } from './ConfigSection';
import { DisplaySection } from './DisplaySection';
import { GrammarSection } from './GrammarSection';

import { PlaybackSection } from './PlaybackSection';

const modeOptions = [
  { value: 'play', label: 'Play' },
  { value: 'test', label: 'Test' }
] as const;

function ModeSelect() {
  const mode = useMode();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMode(e.target.value as Mode);
  };

  return (
    <div className="flex items-center justify-between gap-8">
      <Select
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
      </Select>
    </div>
  );
}

function PlayModeControlPanel() {
  return (
    <>
      <ConfigSection />
      <PlaybackSection />
      <DisplaySection />
      <GrammarSection />
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
