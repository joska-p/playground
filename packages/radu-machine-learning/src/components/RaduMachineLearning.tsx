import { MockDataTable } from './Chart/MockDataTable';
import { ControlPanel } from './ControlPanel';
import { DisplaySamples } from './DisplaySamples';

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
