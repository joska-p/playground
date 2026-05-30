import { useEffect, useRef, useState } from "react";
import { Pipeline } from "../image-pipeline";
import { imageDataToUrl } from "./helpers";

function SnapshotDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [snapshots, setSnapshots] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!sourceData || ranRef.current) return;
    ranRef.current = true;
    setLoading(true);
    Pipeline.from(sourceData)
      .add("grayscale")
      .snapshot()
      .add("invert")
      .snapshot()
      .add("edge-detect")
      .run()
      .then((r) => {
        setSnapshots([...r.snapshots, r.final]);
        setLoading(false);
      });
  }, [sourceData]);

  const stages = ["After: grayscale", "After: invert", "After: edge-detect"];

  if (loading) {
    return <p className="text-muted-foreground text-sm">Running pipeline...</p>;
  }

  return (
    <div className="flex flex-wrap gap-6">
      {snapshots.map((snap, i) => (
        <div key={i} className="w-36">
          <p className="text-muted-foreground mb-1 text-xs">{stages[i] ?? `Step ${i + 1}`}</p>
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
