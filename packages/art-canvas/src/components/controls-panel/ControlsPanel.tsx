import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { ControlPanel } from '@repo/ui/ControlPanel';
import { useSeedControls } from '../../input-modes/seed/useControls';
import { setUiMode } from '../../stores/ui/actions';
import { useInputMode } from '../../stores/ui/selectors';
import type { InputMode } from '../../stores/ui/types';

const inputModes: InputMode[] = ['seed', 'controled', 'manual'];
const inputModeOptions = inputModes.map((mode) => ({
  label: mode.charAt(0).toUpperCase() + mode.slice(1),
  value: mode
}));

function ControlsPanel() {
  const inputMode = useInputMode();

  const inputControl: Control = {
    id: 'inputMode',
    label: 'Mode',
    type: 'select',
    value: inputMode,
    options: inputModeOptions,
    onChange: (v: string) => { setUiMode(v as InputMode); }
  };

  const sections: ControlSection[] = [
    {
      id: 'input',
      label: 'Input',
      defaultOpen: true,
      controls: [inputControl]
    }
  ];

  const fromSeedSection = useSeedControls();

  if (inputMode === 'seed') {
    sections.push(fromSeedSection);
  }

  return <ControlPanel sections={sections} />;
}

export { ControlsPanel };
