import { useEffect, useMemo, useRef, useState } from "react";
import { pipelineGateway } from "../image-pipeline/pipeline-gateway";
import { imageDataToUrl } from "./helpers";

function CustomDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [result, setResult] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!sourceData || ranRef.current) return;
    ranRef.current = true;
    setLoading(true);

    pipelineGateway(sourceData, [{ kind: "manip", id: "demo-warm", opts: {} }])
      .then((r) => setResult(r.final))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sourceData]);

  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  return (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Original</p>
        {sourceUrl && (
          <img
            src={sourceUrl}
            alt="original"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        )}
      </div>
      <div className="flex items-center self-center">
        <span className="text-muted-foreground text-2xl">→</span>
      </div>
      <div className="w-36">
        <p className="text-muted-foreground mb-1 text-xs">Custom: warm filter</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultUrl ? (
          <img
            src={resultUrl}
            alt="custom"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>
    </div>
  );
}

export { CustomDemo };
