import { ImageSourceControls } from "./ImageSourceControls";
import { ManipulationSelector } from "./ManipulationSelector";
import { PresetSelector } from "./PresetSelector";
import { WorkflowControls } from "./WorkflowControls";

function Controls() {
  return (
    <div className="grid md:grid-cols-2 p-2 gap-x-2 gap-y-4 justify-center items-end max-w-[40ch]">
      <ImageSourceControls />
      <PresetSelector />
      <ManipulationSelector />
      <WorkflowControls />
    </div>
  );
}

export { Controls };
