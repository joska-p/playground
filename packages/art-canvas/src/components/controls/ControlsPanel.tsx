import { ControlConditional, ControlPanel, ControlRow } from '@repo/ui/control-panel';
import { Select } from '@repo/ui/data-entry';
import { AtlasControls } from '../../modules/atlas/controls/AtlasControls';
import { ManualControls } from '../../modules/manual/ManualControls';
import { SeedControls } from '../../modules/seed/SeedControls';
import type { InputMode } from '../../stores/ui/store';
import { setUiMode, useInputMode } from '../../stores/ui/store';

const inputModes: InputMode[] = ['seed', 'folded-space', 'atlas', 'manual'];
const inputModeOptions = inputModes.map((mode) => ({
  label: mode.charAt(0).toUpperCase() + mode.slice(1),
  value: mode
}));

function ControlsPanel() {
  const inputMode = useInputMode();

  return (
    <ControlPanel title="controls">
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

      <ControlConditional when={inputMode === 'seed'}>
        <SeedControls />
      </ControlConditional>
      <ControlConditional when={inputMode === 'atlas'}>
        <AtlasControls />
      </ControlConditional>
      <ControlConditional when={inputMode === 'manual'}>
        <ManualControls />
      </ControlConditional>
    </ControlPanel>
  );
}

export { ControlsPanel };
