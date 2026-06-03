import { Button } from "@repo/ui/Button";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { WORKFLOW_PRESETS } from "../../core/workflows/workflows";
import { setWorkflow } from "../../store/workflowStore";

function PresetSelector() {
  const [selectedPreset, setSelectedPreset] = useState(0);

  function loadWorkflowPreset() {
    const preset = WORKFLOW_PRESETS[selectedPreset];
    if (!preset) return;
    setWorkflow(preset.steps.map((step) => ({ ...step, uid: crypto.randomUUID() })));
  }

  return (
    <>
      <Select
        variant="primary"
        value={selectedPreset}
        onChange={(e) => setSelectedPreset(Number(e.target.value))}
        className="flex-1"
        label="Preset"
      >
        {WORKFLOW_PRESETS.map((preset, index) => (
          <option key={preset.name} value={index}>
            {preset.name}
          </option>
        ))}
      </Select>

      <Button onClick={() => loadWorkflowPreset()} className="mt-2 w-full">
        Load Workflow
      </Button>
    </>
  );
}

export { PresetSelector };
