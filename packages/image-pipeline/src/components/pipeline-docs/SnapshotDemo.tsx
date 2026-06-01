import { usePipeline } from "../../hooks/usePipeline";
import { imageDataToUrl } from "./helpers";

const STEPS = [
  { id: "grayscale" },
  { id: "snapshot" },
  { id: "invert" },
  { id: "snapshot" },
  { id: "edge-detect" },
] as const;

const STAGES = ["After: grayscale", "After: invert", "After: edge-detect"];

function SnapshotDemo({ sourceData }: { sourceData: ImageData | null }) {
  const pipelineResult = usePipeline(sourceData, STEPS);
  const allImages = pipelineResult ? [...pipelineResult.snapshots, pipelineResult.final] : [];
  const loading = sourceData !== null && pipelineResult === null;

  if (loading) {
    return <p className="text-muted-foreground text-sm">Running pipeline...</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {allImages.map((snapshot, index) => (
        <div key={index} className="w-28 sm:w-36">
          <p className="text-muted-foreground mb-1 text-xs">
            {STAGES[index] ?? `Step ${index + 1}`}
          </p>
          <img
            src={imageDataToUrl(snapshot)}
            alt={`snapshot ${index}`}
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {snapshot.width}×{snapshot.height}
          </p>
        </div>
      ))}
    </div>
  );
}

export { SnapshotDemo };
