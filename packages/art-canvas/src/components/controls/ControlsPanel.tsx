import { ControlPanel, ControlRow, ControlSection } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { SeedControls } from '../../input-modes/seed/useSeedControls';
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

  return (
    <ControlPanel title="controls">
      <ControlSection
        title="Input"
        defaultOpen
      >
        <ControlRow label="Mode">
          <Select
            value={inputMode}
            onChange={(e) => {
              setUiMode(e.target.value as InputMode);
            }}
          >
            {inputModeOptions.map((opt) => (
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
      {inputMode === 'seed' && <SeedControls />}
    </ControlPanel>
  );
}

export { ControlsPanel };
