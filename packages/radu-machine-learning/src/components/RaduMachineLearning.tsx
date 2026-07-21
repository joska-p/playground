import { ControlPanel } from './ControlPanel';
import { DisplaySamples } from './DisplaySamples';
import { MockDataTable } from './MockDataTable';

function RaduMachineLearning() {
  return (
    <div className="bg-background text-foreground h-screen overflow-hidden">
      <DisplaySamples />
      <MockDataTable />
      <ControlPanel />
    </div>
  );
}

export { RaduMachineLearning };
