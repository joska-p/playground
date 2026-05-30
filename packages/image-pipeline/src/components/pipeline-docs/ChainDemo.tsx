import { useEffect, useMemo, useRef, useState } from "react";
import { Pipeline } from "../../api/index";
import { imageDataToUrl } from "./helpers";

function ChainDemo({ sourceData }: { sourceData: ImageData | null }) {
  const [result, setResult] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!sourceData || ranRef.current) return;
    ranRef.current = true;
    setLoading(true);
    Pipeline.from(sourceData)
      .add("brightness", { value: 1.2 })
      .add("contrast", { value: 1.3 })
      .add("sharpen", { strength: 1.5 })
      .run()
      .then((r) => {
        setResult(r.final);
        setLoading(false);
      });
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
        <p className="text-muted-foreground mb-1 text-xs">Brightness → Contrast → Sharpen</p>
        {loading ? (
          <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
            ...
          </div>
        ) : resultUrl ? (
          <img
            src={resultUrl}
            alt="chained"
            className="border-border w-full rounded border"
            style={{ imageRendering: "pixelated" }}
          />
        ) : null}
      </div>
    </div>
  );
}

export { ChainDemo };
