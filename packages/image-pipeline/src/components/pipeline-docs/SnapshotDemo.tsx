import { imageDataToUrl } from "./helpers";
import { usePipeline } from "./usePipeline";

const STEPS = [
  { kind: "manip", id: "grayscale", opts: {} },
  { kind: "snapshot" },
  { kind: "manip", id: "invert", opts: {} },
  { kind: "snapshot" },
  { kind: "manip", id: "edge-detect", opts: {} },
] as const;

const STAGES = ["After: grayscale", "After: invert", "After: edge-detect"];

function SnapshotDemo({ sourceData }: { sourceData: ImageData | null }) {
  const result = usePipeline(sourceData, STEPS);
  const allImages = result ? [...result.snapshots, result.final] : [];
  const loading = sourceData !== null && result === null;

  if (loading) {
    return <p className="text-muted-foreground text-sm">Running pipeline...</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {allImages.map((snap, i) => (
        <div key={i} className="w-28 sm:w-36">
          <p className="text-muted-foreground mb-1 text-xs">{STAGES[i] ?? `Step ${i + 1}`}</p>
          <img
            src={imageDataToUrl(snap)}
            alt={`snapshot ${i}`}
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="text-muted-foreground mt-1 text-[10px] font-mono">
            {snap.width}×{snap.height}
          </p>
        </div>
      ))}
    </div>
  );
}

export { SnapshotDemo };
