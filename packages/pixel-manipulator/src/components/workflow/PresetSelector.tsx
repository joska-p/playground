import { ControlGrid } from '@repo/ui/control-panel';
import { Button } from '@repo/ui/data-entry';
import { WORKFLOW_PRESETS } from '../../core/workflows/workflows';
import { setWorkflowSteps } from '../../stores/manipulator/actions';

function PresetSelector() {
  function loadPreset(index: number) {
    const preset = WORKFLOW_PRESETS[index];
    if (!preset) return;
    setWorkflowSteps(
      preset.steps.map((step) => ({
        ...step,
        options: step.options ?? {},
        uid: crypto.randomUUID()
      }))
    );
  }

  return (
    <ControlGrid>
      {WORKFLOW_PRESETS.map((preset, index) => (
        <Button
          key={preset.name}
          value={preset.name}
          onChange={() => {
            loadPreset(index);
          }}
        >
          {preset.name}
        </Button>
      ))}
    </ControlGrid>
  );
}

export { PresetSelector };
