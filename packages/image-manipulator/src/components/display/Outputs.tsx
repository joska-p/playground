import { useIsProcessing, usePipelineImageSource, usePipelineOutputs } from "../../store/pipelineStore";
import { OutputCard } from "./OutputCard";

function Outputs() {
  const imageSource = usePipelineImageSource();
  const outputs = usePipelineOutputs();
  const isProcessing = useIsProcessing();

  if (!imageSource && outputs.length === 0) {
    return (
      <p className="text-muted-foreground p-16 text-center text-sm">Upload an image to begin</p>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
        {imageSource && (
          <OutputCard key={imageSource.id} output={imageSource} index={0} isSource />
        )}
        {outputs.map((output, index) => (
          <OutputCard key={output.id} output={output} index={index + 1} />
        ))}
      </div>

      {isProcessing && imageSource && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground text-sm">Processing&hellip;</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { Outputs };
