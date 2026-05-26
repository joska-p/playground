import { Input, Select, Button } from "@repo/ui";
import { useImageUpload } from "../../hooks/use-image-upload";
import { manipulations } from "../../manipulations";
import { useManipulatorStore } from "../../store/useManipulatorStore";
import type { ManipulationId } from "../../store/useManipulatorStore";
import { setManipulationId } from "../../store/useManipulatorStore";
import { addToPipe } from "../../store/useManipulatorStore";
import { clearPipe } from "../../store/useManipulatorStore";

function Controls() {
  const { currentManipulationId, pipe } = useManipulatorStore.getState();
  const { handleImageUpload } = useImageUpload();

  const handleSetManipulationId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("target", e.target.value);
    setManipulationId(e.target.value as ManipulationId);
  };

  const handleAddToPipe = () => {
    console.log("pipe", pipe);
    addToPipe([currentManipulationId]);
  };
  const handleClearPipe = () => clearPipe();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input type="file" accept="image/*" onChange={handleImageUpload} label="upload an image" />

      <Select
        variant="primary"
        value={currentManipulationId}
        onChange={handleSetManipulationId}
        className="flex-1 pr-6"
        label="Manipulation"
      >
        {manipulations.map((manipulation) => (
          <option key={manipulation.id} value={manipulation.id}>
            {manipulation.name}
          </option>
        ))}
      </Select>

      <Button onClick={handleAddToPipe}>Add to Pipe</Button>
      <Button onClick={handleClearPipe}>Clear Pipe</Button>

      <h4>Current Manipulation: {currentManipulationId}</h4>

      <h4>Current Pipe</h4>
      <div className="flex flex-col">
        {pipe.map((manipulationId, index) => (
          <div key={index}>{manipulationId}</div>
        ))}
      </div>
    </div>
  );
}

export { Controls };
