import { DisplaySamples } from './DisplaySamples';
import { Sketchpad } from './sketchpad/Sketchpad';

function RaduMachineLearning() {
  return (
    <div className="bg-background text-foreground h-screen overflow-hidden">
      <DisplaySamples />
      <Sketchpad />
    </div>
  );
}

export { RaduMachineLearning };
