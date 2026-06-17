import { Select } from '@repo/ui/Select';
import { Slider } from '@repo/ui/Slider';
import type { ChangeEvent, JSX } from 'react';
import { getAllPresets } from '../../core/visualizations/registry';
import {
  loadPreset,
  setSequenceSteps,
  useBasePresetId,
  useSequenceRule,
  useSequenceSteps
} from '../../stores/sequence/store';
import { LayerStackEditor } from './LayerStackEditor';
import { SequenceSelector } from './SequenceSelector';
import { ViewportControls } from './ViewportControls';

function Controls(): JSX.Element {
  const sequenceRule = useSequenceRule();
  const steps = useSequenceSteps();
  const basePresetId = useBasePresetId();

  const allPresets = getAllPresets();
  const builtInPresets = allPresets.filter((p) => p.isBuiltIn);
  const customPresets = allPresets.filter((p) => !p.isBuiltIn);

  const isCustom = basePresetId === null;
  const currentPresetId = basePresetId ?? 'custom';

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-3 px-3 py-3">
        <SequenceSelector />

        <Slider
          variant="secondary"
          layout="inline"
          label="Steps"
          min={2}
          max={sequenceRule.maxSteps}
          step={1}
          value={steps}
          onChange={(steps) => setSequenceSteps({ steps })}
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">
            Visualization:
          </span>
          <Select
            variant="secondary"
            value={currentPresetId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              loadPreset(e.target.value)
            }
            className="flex-1"
          >
            {builtInPresets.map((p) => (
              <option
                key={p.id}
                value={p.id}
              >
                {p.name}
              </option>
            ))}
            {customPresets.length > 0 && (
              <optgroup label="Custom">
                {customPresets.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.name}
                  </option>
                ))}
              </optgroup>
            )}
            {isCustom && (
              <option
                value="custom"
                disabled
              >
                (Custom)
              </option>
            )}
          </Select>
        </div>
      </div>

      <LayerStackEditor />
      <ViewportControls />
    </div>
  );
}

export { Controls };
