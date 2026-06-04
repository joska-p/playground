import { Button } from '@repo/ui/Button';
import {
  clearWorkflowSteps,
  executeWorkflow,
} from '../../stores/manipulator/actions';
import {
  useIsProcessing,
  useWorkflowSteps,
} from '../../stores/manipulator/selectors';
import { WorkflowList } from './WorkflowList';

function WorkflowControls() {
  const workflow = useWorkflowSteps();
  const isProcessing = useIsProcessing();

  return (
    <>
      <WorkflowList steps={workflow} />
      <Button
        isLoading={isProcessing}
        onClick={() => executeWorkflow()}
      >
        Execute workflow
      </Button>
      <Button
        variant="outline"
        isLoading={isProcessing}
        onClick={() => clearWorkflowSteps()}
      >
        Clear Workflow
      </Button>
    </>
  );
}

export { WorkflowControls };
