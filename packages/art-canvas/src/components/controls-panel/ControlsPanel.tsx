import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { ControlPanel } from '@repo/ui/ControlPanel';
import { setSeed, setUiMode } from '../../stores/ui/actions';
import { useInputMode, useSeed } from '../../stores/ui/selectors';
import type { InputMode } from '../../stores/ui/types';

const inputModes: InputMode[] = ['seed', 'controled', 'manual'];
const inputModeOptions = inputModes.map((mode) => ({
  label: mode.charAt(0).toUpperCase() + mode.slice(1),
  value: mode
}));

function ControlsPanel() {
  const inputMode = useInputMode();
  const seed = useSeed();

  const inputControl: Control = {
    id: 'inputMode',
    label: 'Mode',
    type: 'select',
    value: inputMode,
    options: inputModeOptions,
    onChange: (v: string) => setUiMode(v as InputMode)
  };

  const seedControl: Control = {
    id: 'seed',
    label: 'Seed',
    type: 'text',
    value: seed,
    onChange: (v: string) => setSeed(v)
  };

  const sections: ControlSection[] = [
    {
      id: 'input',
      label: 'Input',
      defaultOpen: true,
      controls: [inputControl]
    }
  ];

  if (inputMode === 'seed') {
    sections.find((section) => section.id === 'input')!.controls.push(seedControl);
  }

  return <ControlPanel sections={sections} />;
}

export { ControlsPanel };
