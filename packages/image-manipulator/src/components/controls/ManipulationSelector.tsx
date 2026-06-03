import { Button } from "@repo/ui/Button";
import { Select } from "@repo/ui/Select";
import type { ManipulationId } from "../../core/manipulations/manipulations";
import { manipulations, manipulationsIds } from "../../core/manipulations/manipulations";
import { setPipelineManipulationId, usePipelineManipulationId } from "../../store/pipelineStore";
import { addToWorkflow } from "../../store/workflowStore";

function ManipulationSelector() {
  const manipulationId = usePipelineManipulationId();

  return (
    <>
      <Select
        variant="primary"
        value={manipulationId}
        onChange={(e) => setPipelineManipulationId(e.target.value as ManipulationId)}
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
    </>
  );
}

export { ManipulationSelector };
