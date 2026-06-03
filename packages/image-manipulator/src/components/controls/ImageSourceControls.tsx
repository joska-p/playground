import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";
import { useImageUpload } from "../../hooks/useImageUpload";
import { clearPipelineOutputs } from "../../store/pipelineStore";

function ImageSourceControls() {
  const { handleImageUpload } = useImageUpload();

  return (
    <>
      <Input type="file" accept="image/*" onChange={handleImageUpload} label="upload an image" />
      <Button variant="outline" onClick={() => clearPipelineOutputs()}>
        Clear Outputs
      </Button>
    </>
  );
}

export { ImageSourceControls };
