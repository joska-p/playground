import { Card, CardContent } from "@repo/ui/Card";
import { Slider } from "@repo/ui/Slider";
import { useEffect, useMemo, useState } from "react";
import { pipelineGateway } from "../image-pipeline/pipeline-gateway";
import { CodeBlock } from "./CodeBlock";
import { imageDataToUrl } from "./helpers";
import type { ManipInfo } from "./manipData";

function ManipCard({
  manip,
  sourceData,
  params,
  onParamChange,
}: {
  manip: ManipInfo;
  sourceData: ImageData | null;
  params: Record<string, number>;
  onParamChange: (id: string, key: string, value: number) => void;
}) {
  const [result, setResult] = useState<ImageData | null>(null);

  useEffect(() => {
    if (!sourceData) return;
    let cancelled = false;

    const opts: Record<string, unknown> = {};
    if (manip.params) {
      for (const p of manip.params) {
        opts[p.key] = params[`${manip.id}:${p.key}`] ?? p.default;
      }
    }

    pipelineGateway(sourceData, [{ kind: "manip", id: manip.id, opts }])
      .then((r) => setResult(r.final))
      .catch(console.error)
      .finally(() => {
        if (!cancelled) {
          setResult(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sourceData, manip.id, params, manip.params]);

  const resultUrl = useMemo(() => (result ? imageDataToUrl(result) : null), [result]);
  const sourceUrl = useMemo(() => (sourceData ? imageDataToUrl(sourceData) : null), [sourceData]);

  const codeLines = [
    `Pipeline.from(source)`,
    `  .add("${manip.id}"${manip.params && manip.params.length > 0 ? ", { " + manip.params.map((p) => `${p.key}: ${params[`${manip.id}:${p.key}`] ?? p.default}`).join(", ") + " }" : ""})`,
    `  .run()`,
  ];

  const running = sourceData !== null && result === null;

  return (
    <Card className="overflow-hidden rounded-xl flex flex-col">
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <span className="font-semibold">{manip.label}</span>
        <span className="text-muted-foreground text-xs">{manip.type}</span>
      </div>
      <CardContent className="p-4">
        <p className="text-muted-foreground mb-3 text-xs">{manip.description}</p>
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-muted-foreground mb-1 text-[10px] uppercase tracking-wide">
              Original
            </p>
            {sourceUrl && (
              <img
                src={sourceUrl}
                alt="original"
                className="border-border w-full rounded border"
                style={{ imageRendering: "pixelated" }}
              />
            )}
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-[10px] uppercase tracking-wide">Result</p>
            {running ? (
              <div className="border-border flex aspect-square items-center justify-center rounded border text-xs opacity-50">
                ...
              </div>
            ) : resultUrl ? (
              <img
                src={resultUrl}
                alt={manip.label}
                className="border-border w-full rounded border"
                style={{ imageRendering: "pixelated" }}
              />
            ) : null}
          </div>
        </div>
        {manip.params &&
          manip.params.map((p) => (
            <Slider
              key={p.key}
              label={p.label}
              min={p.min}
              max={p.max}
              step={p.step}
              value={params[`${manip.id}:${p.key}`] ?? p.default}
              onChange={(v) => onParamChange(manip.id, p.key, v)}
            />
          ))}
        <details className="group">
          <summary className="text-muted-foreground cursor-pointer text-[10px] uppercase tracking-wide">
            Code
          </summary>
          <div className="mt-2">
            <CodeBlock code={codeLines.join("\n")} />
          </div>
        </details>
      </CardContent>
    </Card>
  );
}

export { ManipCard };
