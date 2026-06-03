import { useSourceImage } from "../../hooks/useSourceImage";
import { usePipelineOutputs } from "../../store/pipelineStore";
import { OutputCard } from "./OutputCard";

function Outputs() {
  useSourceImage();
  const outputs = usePipelineOutputs();

  if (outputs.length === 0) {
    return (
      <p className="text-muted-foreground p-16 text-center text-sm">Upload an image to begin</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3">
      {outputs.map((output, index) => (
        <OutputCard key={output.id} output={output} index={index} />
      ))}
    </div>
  );
}

export { Outputs };
