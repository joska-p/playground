import { Button } from "@repo/ui/Button";
import { clearPipelineOutputs } from "../../store/pipelineStore";
import { UploadZone } from "./UploadZone";

function ImageSourceControls() {
  return (
    <div className="flex flex-col gap-2">
      <UploadZone />
      <Button
        variant="ghost"
        size="small"
        onClick={() => clearPipelineOutputs()}
        className="self-end"
      >
        Clear Outputs
      </Button>
    </div>
  );
}

export { ImageSourceControls };
