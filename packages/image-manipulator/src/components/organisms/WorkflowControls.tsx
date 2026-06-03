import { pipelineGateway } from "@repo/image-pipeline/PipelineGateway";
import { Button } from "@repo/ui/Button";
import {
  setPipelineOutputs,
  setProcessing,
  useIsProcessing,
  usePipelineImageSource,
} from "../../store/pipelineStore";
import { clearWorkflow, useWorkflow } from "../../store/workflowStore";
import { WorkflowList } from "./WorkflowList";

function WorkflowControls() {
  const workflow = useWorkflow();
  const imageSource = usePipelineImageSource();
  const isProcessing = useIsProcessing();

  async function executeWorkflow() {
    if (!workflow.length || !imageSource?.imageData || isProcessing) return;
    setProcessing(true);

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
      setProcessing(false);
    }
  }

  return (
    <>
      <WorkflowList steps={workflow} />
      <Button isLoading={isProcessing} onClick={() => executeWorkflow()}>
        Execute workflow
      </Button>
      <Button variant="outline" isLoading={isProcessing} onClick={() => clearWorkflow()}>
        Clear Workflow
      </Button>
    </>
  );
}

export { WorkflowControls };
