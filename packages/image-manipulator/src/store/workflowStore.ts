import { create } from "zustand";
import { manipulations } from "../manipulations/manipulations";
import type { ManipulationId } from "./manipulatorStore";

type WorkflowStep = {
  id: ManipulationId;
  args: Record<string, number>;
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

function addToWorkflow(id: ManipulationId) {
  const workflow = workflowStore.getState().workflow;
  workflowStore.setState({
    workflow: [...workflow, { id, args: { ...manipulations[id].defaultArgs } }],
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

function updateWorkflowStepArgs(index: number, args: Record<string, number>) {
  const workflow = workflowStore.getState().workflow;
  const updated = workflow.map((step, i) => (i === index ? { ...step, args } : step));
  workflowStore.setState({ workflow: updated });
}

function clearWorkflow() {
  workflowStore.setState({ workflow: [] });
}

export type { WorkflowStep };
export { useWorkflow, addToWorkflow, removeWorkflowStep, moveWorkflowStep, updateWorkflowStepArgs, clearWorkflow };
