import { pixel } from '@repo/pixel';
import { manipulatorStore } from './store';
import type { OutputType, WorkflowStep } from './types';

function setImageSource(imageSource?: OutputType) {
  manipulatorStore.setState({ imageSource });
}

function clearImageSource() {
  manipulatorStore.setState({ imageSource: undefined });
}

function setOutputs(outputs: OutputType[]) {
  manipulatorStore.setState({ outputs });
}

function clearOutputs() {
  manipulatorStore.setState({ outputs: [] });
}

function addWorkflowStep(id: string) {
  const { workflow } = manipulatorStore.getState();
  const entry = pixel.manipulations[id];
  manipulatorStore.setState({
    workflow: [
      ...workflow,
      {
        uid: crypto.randomUUID(),
        id,
        options: { ...(entry?.defaultArgs ?? {}) }
      }
    ]
  });
}

function removeWorkflowStep(index: number) {
  const { workflow } = manipulatorStore.getState();
  manipulatorStore.setState({
    workflow: workflow.filter((_, i) => i !== index)
  });
}

function moveWorkflowStep(index: number, direction: -1 | 1) {
  const { workflow } = manipulatorStore.getState();
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= workflow.length) return;

  const updated = [...workflow];
  [updated[index], updated[targetIndex]] = [
    updated[targetIndex],
    updated[index]
  ];
  manipulatorStore.setState({ workflow: updated });
}

function updateStepOptions(index: number, options: Record<string, number>) {
  const { workflow } = manipulatorStore.getState();
  const updated = workflow.map((step, i) =>
    i === index ? { ...step, options } : step
  );
  manipulatorStore.setState({ workflow: updated });
}

function clearWorkflowSteps() {
  manipulatorStore.setState({ workflow: [] });
}

function setWorkflowSteps(steps: WorkflowStep[]) {
  manipulatorStore.setState({ workflow: [...steps] });
}

async function executeWorkflow() {
  const { imageSource, workflow } = manipulatorStore.getState();
  if (!workflow.length || !imageSource?.imageData) return;

  manipulatorStore.setState({ isProcessing: true });
  try {
    const results = await pixel.run({
      sourceImageData: imageSource.imageData,
      steps: workflow.map((step) => ({ id: step.id, options: step.options }))
    });

    setOutputs(
      results.map((imageData, i) => ({
        id: `step-${i + 1}`,
        name: `Step ${i + 1}`,
        description: workflow[i].id,
        imageData
      }))
    );
  } catch (err) {
    console.error('Pipeline execution failed:', err);
  } finally {
    manipulatorStore.setState({ isProcessing: false });
  }
}

export {
  addWorkflowStep,
  clearImageSource,
  clearOutputs,
  clearWorkflowSteps,
  executeWorkflow,
  moveWorkflowStep,
  removeWorkflowStep,
  setImageSource,
  setWorkflowSteps,
  updateStepOptions
};
