import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";
import { Select } from "@repo/ui/Select";
import { manipulate } from "../../core/manipulate";
import { useImageUpload } from "../../hooks/useImageUpload";
import { manipulations, manipulationsIds } from "../../manipulations/manipulations";
import type { ManipulationId } from "../../store/manipulatorStore";
import {
  addToManipulatorOutputs,
  clearManipulatorOutputs,
  setManipulatorManipulationId,
  useManipulatorManipulationId,
  useManipulatorOutputs,
} from "../../store/manipulatorStore";
import { addToWorkflow, clearWorkflow, useWorkflow } from "../../store/workflowStore";
import { Workflow } from "./workflow/Workflow";

function Controls() {
  const outputs = useManipulatorOutputs();
  const sourceImage = outputs[0];
  const manipulationId = useManipulatorManipulationId();
  const workflow = useWorkflow();

  const { handleImageUpload } = useImageUpload();

  function executeWorkflow() {
    if (!workflow || workflow.length === 0) return;

    const pipeline = manipulate(sourceImage.imageData);
    workflow.forEach((step) =>
      pipeline.apply(manipulations[step.id].callback(...Object.values(step.args)))
    );

    const results = pipeline.toArray();
    clearManipulatorOutputs();

    results.slice(1).forEach((imageData, i) => {
      addToManipulatorOutputs({
        id: `step-${i}`,
        name: `Step ${i + 1}`,
        description: workflow[i].id,
        imageData,
      });
    });
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-[35ch]">
      <Input type="file" accept="image/*" onChange={handleImageUpload} label="upload an image" />

      <Select
        variant="primary"
        value={manipulationId}
        onChange={(e) => setManipulatorManipulationId(e.target.value as ManipulationId)}
        className="flex-1"
        label="Manipulation"
      >
        {manipulationsIds.map((id) => (
          <option key={id} value={id}>
            {manipulations[id].name}
          </option>
        ))}
      </Select>

      <div className="gap-4 md:grid md:grid-cols-2">
        <Button onClick={() => addToWorkflow(manipulationId)}>Add to Worflow</Button>
        <Button onClick={() => clearWorkflow()}>Clear Worflow</Button>
      </div>

      <Workflow steps={workflow} />

      <div className="gap-4 md:grid md:grid-cols-2">
        <Button onClick={() => executeWorkflow()}>Execute workflow</Button>
        <Button onClick={() => clearManipulatorOutputs()}>Clear Ouputs</Button>
      </div>
    </div>
  );
}

export { Controls };
