import { Button, Input, Select } from "@repo/ui";
import { pipe } from "../../core/pipe";
import { useImageUpload } from "../../hooks/use-image-upload";
import { manipulations, manipulationsIds } from "../../manipulations";
import type { ManipulationId, OutputType } from "../../store/useManipulatorStore";
import {
  addToOutputs,
  addToWorkflow,
  clearOutputs,
  clearWorkflow,
  setManipulationId,
  useManipulatorStore,
} from "../../store/useManipulatorStore";

function Controls() {
  const sourceImage = useManipulatorStore((state) => state.outputs[0]);
  const manipulationId = useManipulatorStore((state) => state.manipulationId);
  const workflow = useManipulatorStore((state) => state.workflow);

  const { handleImageUpload } = useImageUpload();

  function executeWorkflow() {
    if (!workflow || workflow.length === 0) return;
    const output: OutputType = {
      id: "result",
      name: "Result",
      description: "Result of the workflow",
      imageData: pipe(
        ...workflow.map((manipulationId) => manipulations[manipulationId].callback())
      )(sourceImage.imageData),
    };
    addToOutputs(output);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input type="file" accept="image/*" onChange={handleImageUpload} label="upload an image" />

      <Select
        variant="primary"
        value={manipulationId}
        onChange={(e) => setManipulationId(e.target.value as ManipulationId)}
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

      <ol className="list-inside list-decimal">
        {workflow.map((manipulationId, index) => (
          <li key={index}>{manipulationId}</li>
        ))}
      </ol>

      <div className="gap-4 md:grid md:grid-cols-2">
        <Button onClick={() => executeWorkflow()}>Execute workflow</Button>
        <Button onClick={() => clearOutputs()}>Clear Ouputs</Button>
      </div>
    </div>
  );
}

export { Controls };
