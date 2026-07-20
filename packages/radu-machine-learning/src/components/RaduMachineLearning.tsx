import { DisplaySamples } from './DisplaySamples';
import { Sketchpad } from './sketchpad/Sketchpad';

function RaduMachineLearning() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <DisplaySamples />
      <Sketchpad />
    </div>
  );
}

export { RaduMachineLearning };
