import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";
import { Select } from "@repo/ui/Select";
import { pipe } from "../../core/pipe";
import { useImageUpload } from "../../hooks/useImageUpload";
import { brightness } from "../../manipulations/brightness";
import { energyMap } from "../../manipulations/energyMap";
import { grayscale } from "../../manipulations/grayscale";
import type { ManipulationId, OutputType } from "../../store/manipulatorStore";
import {
  addToManipulatorOutputs,
  addToManipulatorWorkflow,
  clearManipulatorOutputs,
  clearManipulatorWorkflow,
  setManipulatorManipulationId,
  useManipulatorManipulationId,
  useManipulatorOutputs,
  useManipulatorWorkflow,
} from "../../store/manipulatorStore";

const manipulationsIds = ["brightness", "grayscale", "energyMap"] as const;
const manipulations = { brightness, grayscale, energyMap } as const;

function Controls() {
  const outputs = useManipulatorOutputs();
  const sourceImage = outputs[0];
  const manipulationId = useManipulatorManipulationId();
  const workflow = useManipulatorWorkflow();

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
    addToManipulatorOutputs(output);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
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
        <Button onClick={() => addToManipulatorWorkflow(manipulationId)}>Add to Worflow</Button>
        <Button onClick={() => clearManipulatorWorkflow()}>Clear Worflow</Button>
      </div>

      <ol className="list-inside list-decimal">
        {workflow.map((manipulationId, index) => (
          <li key={index}>{manipulationId}</li>
        ))}
      </ol>

      <div className="gap-4 md:grid md:grid-cols-2">
        <Button onClick={() => executeWorkflow()}>Execute workflow</Button>
        <Button onClick={() => clearManipulatorOutputs()}>Clear Ouputs</Button>
      </div>
    </div>
  );
}

export { Controls };
