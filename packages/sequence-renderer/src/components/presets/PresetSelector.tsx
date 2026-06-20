import { getAllPresets } from '@repo/sequence-engine/visualizations';
import { Select } from '@repo/ui/Select';
import type { ChangeEvent, JSX } from 'react';
import { loadPreset } from '../../stores/sequence/actions';
import { useBasePresetId } from '../../stores/sequence/selectors/useBasePresetId';

function PresetSelector(): JSX.Element {
  const basePresetId = useBasePresetId();

  const allPresets = getAllPresets();
  const builtInPresets = allPresets.filter((p) => p.isBuiltIn);
  const customPresets = allPresets.filter((p) => !p.isBuiltIn);

  const isCustom = basePresetId === null;
  const currentPresetId = basePresetId ?? 'custom';

  return (
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
  );
}

export { PresetSelector };
