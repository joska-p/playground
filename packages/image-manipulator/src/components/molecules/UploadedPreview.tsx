import { Button } from "@repo/ui/Button";
import type { OutputType } from "../../store/pipelineStore";
import { CloseIcon } from "../atoms/CloseIcon";

type UploadedPreviewProps = {
  imageSource: OutputType;
  fileName: string | null;
  onClear: () => void;
};

function UploadedPreview({ imageSource, fileName, onClear }: UploadedPreviewProps) {
  return (
    <div className="border-border bg-card flex items-center gap-3 rounded-lg border p-3">
      <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
        <canvas
          ref={(el) => {
            if (el) {
              el.width = imageSource.imageData.width;
              el.height = imageSource.imageData.height;
              const ctx = el.getContext("2d");
              if (ctx) ctx.putImageData(imageSource.imageData, 0, 0);
            }
          }}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-medium">{fileName ?? "image"}</p>
        <p className="text-muted-foreground text-xs">
          {imageSource.imageData.width} × {imageSource.imageData.height}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        aria-label="Remove image"
        className="shrink-0"
      >
        <CloseIcon />
      </Button>
    </div>
  );
}

export { UploadedPreview };
