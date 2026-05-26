import { Input, Select, Button } from "@repo/ui";
import { useImageUpload } from "../../hooks/use-image-upload";
import { manipulations } from "../../manipulations";
import { fork } from "../../core/fork";
import {
  useManipulatorStore,
  setManipulationId,
  addToWorkflow,
  clearWorkflow,
  addToOutputs,
  clearOutputs,
} from "../../store/useManipulatorStore";
import type { ManipulationId, OutputType } from "../../store/useManipulatorStore";

function Controls() {
  const sourceImage = useManipulatorStore((state) => state.outputs[0]);
  const manipulationId = useManipulatorStore((state) => state.manipulationId);
  const workflow = useManipulatorStore((state) => state.workflow);

  const { handleImageUpload } = useImageUpload();

  function executeWorkflow() {
    if (!workflow || workflow.length === 0) return;
    workflow.forEach((manipulationId, index) => {
      const output: OutputType = {
        id: index.toString(),
        name: "TODO",
        description: "TODO",
        imageData: fork(manipulations[index].callback())(sourceImage.imageData),
      };
      addToOutputs(output);
    });
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
        {manipulations.map((manipulation) => (
          <option key={manipulation.id} value={manipulation.id}>
            {manipulation.name}
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
