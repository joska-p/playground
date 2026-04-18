import { Input, Label, Slider } from "@repo/ui";
import { useRacamanContext } from "./racaman-context.js";

function Controls() {
  const { config, setConfig } = useRacamanContext();

  return (
    <aside className="flex flex-col gap-6 rounded-lg border bg-card p-4 shadow-sm md:w-64">
      <div className="flex flex-col gap-4">
        <Label className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            Iterations: {config.iterations}
          </span>
          <Slider
            min={10}
            max={2000}
            step={10}
            value={config.iterations}
            onChange={(val) => setConfig({ ...config, iterations: val })}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            Step Size: {config.stepSize}
          </span>
          <Slider
            min={1}
            max={50}
            step={0.5}
            value={config.stepSize}
            onChange={(val) => setConfig({ ...config, stepSize: val })}
          />
        </Label>

        <Label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Stroke Width</span>
          <Input
            type="number"
            min={0.1}
            max={10}
            step={0.1}
            value={config.strokeWidth}
            onChange={(e) =>
              setConfig({
                ...config,
                strokeWidth: parseFloat(e.target.value) || 1,
              })
            }
          />
        </Label>
      </div>
    </aside>
  );
}

export { Controls };
