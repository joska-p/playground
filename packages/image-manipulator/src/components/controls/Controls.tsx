import { pipelineGateway } from "@repo/image-pipeline/PipelineGateway";
import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";
import { Select } from "@repo/ui/Select";
import { useRef, useState } from "react";
import type { ManipulationId } from "../../core/manipulations/manipulations";
import { manipulations, manipulationsIds } from "../../core/manipulations/manipulations";
import { WORKFLOW_PRESETS } from "../../core/workflows/workflows";
import { useImageUpload } from "../../hooks/useImageUpload";
import {
  addToManipulatorOutputs,
  clearManipulatorOutputs,
  setManipulatorManipulationId,
  useManipulatorManipulationId,
  useManipulatorOutputs,
} from "../../store/manipulatorStore";
import { addToWorkflow, clearWorkflow, setWorkflow, useWorkflow } from "../../store/workflowStore";
import { Workflow } from "./workflow/Workflow";

function Controls() {
  const outputs = useManipulatorOutputs();
  const sourceImage = outputs[0];
  const manipulationId = useManipulatorManipulationId();
  const workflow = useWorkflow();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const { handleImageUpload } = useImageUpload();
  const runningRef = useRef(false);

  function loadWorkflowPreset() {
    const preset = WORKFLOW_PRESETS[selectedPreset];
    if (!preset) return;
    setWorkflow(preset.steps);
  }

  async function executeWorkflow() {
    if (!workflow.length || !sourceImage?.imageData || runningRef.current) return;
    runningRef.current = true;

    try {
      const results = await pipelineGateway.run({
        sourceImageData: sourceImage.imageData,
        steps: workflow.map((step) => ({ id: step.id, options: step.options })),
      });

      clearManipulatorOutputs();

      results.forEach((imageData, i) => {
        if (i === 0) return;
        addToManipulatorOutputs({
          id: `step-${i}`,
          name: `Step ${i}`,
          description: workflow[i - 1].id,
          // workflow[i - 1] The first output is the source image. There is 1 workflow step less than outputs
          imageData,
        });
      });
    } catch (err) {
      console.error("Pipeline execution failed:", err);
    } finally {
      runningRef.current = false;
    }
  }

  return (
    <div className="grid md:grid-cols-2 p-2 gap-x-2 gap-y-4 justify-center items-end max-w-[40ch]">
      <Input type="file" accept="image/*" onChange={handleImageUpload} label="upload an image" />
      <Button variant="outline" onClick={() => clearManipulatorOutputs()}>
        Clear Outputs
      </Button>

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

      <Select
        variant="primary"
        value={manipulationId}
        onChange={(e) => setManipulatorManipulationId(e.target.value as ManipulationId)}
        className="flex-1"
        label="Manipulation"
      >
        {manipulationsIds.map((id) => (
          <option key={id} value={id}>
            {manipulations[id]?.name ?? id}
          </option>
        ))}
      </Select>

      <Button onClick={() => addToWorkflow(manipulationId)}>Add to Workflow</Button>

      <Workflow steps={workflow} />

      <Button onClick={() => executeWorkflow()}>Execute workflow</Button>
      <Button variant="outline" onClick={() => clearWorkflow()}>
        Clear Workflow
      </Button>
    </div>
  );
}

export { Controls };
