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
        uid: crypto.randomUUID(),
      }))
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2">
      {WORKFLOW_PRESETS.map((preset, index) => (
        <li key={preset.name}>
          <button
            onClick={() => loadPreset(index)}
            className="border-border bg-card hover:bg-foreground/5 cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors"
          >
            {preset.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export { PresetSelector };
