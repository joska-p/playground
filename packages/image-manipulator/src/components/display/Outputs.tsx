import { usePipelineImageSource, usePipelineOutputs } from "../../store/pipelineStore";
import { OutputCard } from "./OutputCard";

function Outputs() {
  const imageSource = usePipelineImageSource();
  const outputs = usePipelineOutputs();

  if (!imageSource && outputs.length === 0) {
    return (
      <p className="text-muted-foreground p-16 text-center text-sm">Upload an image to begin</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
      <OutputCard key={imageSource.id} output={imageSource} index={0} />
      {outputs.map((output, index) => (
        <OutputCard key={output.id} output={output} index={index + 1} />
      ))}
    </div>
  );
}

export { Outputs };
