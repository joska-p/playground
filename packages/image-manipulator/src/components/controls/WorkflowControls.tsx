import { pipelineGateway } from "@repo/image-pipeline/PipelineGateway";
import { Button } from "@repo/ui/Button";
import { useRef } from "react";
import { setPipelineOutputs, usePipelineImageSource } from "../../store/pipelineStore";
import { clearWorkflow, useWorkflow } from "../../store/workflowStore";
import { Workflow } from "./workflow/Workflow";

function WorkflowControls() {
  const workflow = useWorkflow();
  const imageSource = usePipelineImageSource();
  const runningRef = useRef(false);

  async function executeWorkflow() {
    if (!workflow.length || !imageSource?.imageData || runningRef.current) return;
    runningRef.current = true;

    try {
      const results = await pipelineGateway.run({
        sourceImageData: imageSource.imageData,
        steps: workflow.map((step) => ({ id: step.id, options: step.options })),
      });

      setPipelineOutputs(
        results.map((imageData, i) => ({
          id: `step-${i + 1}`,
          name: `Step ${i + 1}`,
          description: workflow[i].id,
          imageData,
        }))
      );
    } catch (err) {
      console.error("Pipeline execution failed:", err);
    } finally {
      runningRef.current = false;
    }
  }

  return (
    <>
      <Workflow steps={workflow} />
      <Button onClick={() => executeWorkflow()}>Execute workflow</Button>
      <Button variant="outline" onClick={() => clearWorkflow()}>
        Clear Workflow
      </Button>
    </>
  );
}

export { WorkflowControls };
