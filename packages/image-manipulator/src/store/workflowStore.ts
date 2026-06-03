import { create } from "zustand";
import { manipulations } from "../core/manipulations/manipulations";

type WorkflowStep = {
  id: string;
  options: Record<string, number>;
};

type WorkflowState = {
  workflow: WorkflowStep[];
};

const workflowStore = create<WorkflowState>(() => ({
  workflow: [],
}));

function useWorkflow(): WorkflowStep[] {
  return workflowStore((s) => s.workflow);
}

function addToWorkflow(id: string) {
  const workflow = workflowStore.getState().workflow;
  const manipData = manipulations[id];
  workflowStore.setState({
    workflow: [...workflow, { id, options: { ...(manipData?.defaultArgs ?? {}) } }],
  });
}

function removeWorkflowStep(index: number) {
  const workflow = workflowStore.getState().workflow;
  workflowStore.setState({
    workflow: workflow.filter((_, i) => i !== index),
  });
}

function moveWorkflowStep(index: number, direction: -1 | 1) {
  const workflow = workflowStore.getState().workflow;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= workflow.length) return;

  const updated = [...workflow];
  [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
  workflowStore.setState({ workflow: updated });
}

function updateWorkflowStepOptions(index: number, options: Record<string, number>) {
  const workflow = workflowStore.getState().workflow;
  const updated = workflow.map((step, i) => (i === index ? { ...step, options } : step));
  workflowStore.setState({ workflow: updated });
}

function clearWorkflow() {
  workflowStore.setState({ workflow: [] });
}

function setWorkflow(steps: WorkflowStep[]) {
  workflowStore.setState({ workflow: [...steps] });
}

export {
  addToWorkflow,
  clearWorkflow,
  moveWorkflowStep,
  removeWorkflowStep,
  setWorkflow,
  updateWorkflowStepOptions,
  useWorkflow,
};
export type { WorkflowStep };
