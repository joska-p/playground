import { Select } from '@repo/ui/Select';
import { Slider } from '@repo/ui/Slider';
import type { ChangeEvent, JSX } from 'react';
import { getAllPresets } from '../../core/visualizations/registry';
import {
  loadPreset,
  setSequenceSteps,
  useSequenceRule,
  useSequenceSteps,
  useBasePresetId
} from '../../stores/sequence/store';
import { SequenceSelector } from './SequenceSelector';
import { LayerStackEditor } from './LayerStackEditor';

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
      <div className="flex w-full items-center justify-center gap-8 px-4 py-2">
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
          className="max-w-xs"
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Visualization:</span>
          <Select
            variant="secondary"
            value={currentPresetId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              loadPreset(e.target.value)
            }
            className="w-auto min-w-35"
          >
            {builtInPresets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
            {customPresets.length > 0 && (
              <optgroup label="Custom">
                {customPresets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            )}
            {isCustom && (
              <option value="custom" disabled>
                (Custom)
              </option>
            )}
          </Select>
        </div>
      </div>

      <LayerStackEditor />
    </div>
  );
}

export { Controls };
