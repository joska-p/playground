import { Button, Input } from "@repo/ui";
import { useState } from "react";
import { usePaletteStore, addPalette } from "../../../store/usePaletteStore.js";
import type { Palette, BaseColor } from "../../../store/usePaletteStore.js";

interface ParamDef {
  name: string;
  label: string;
  min: number;
  max: number;
}

interface GeneratorFormConfig {
  label: string;
  defaultParams: Record<string, number>;
  paramDefs: ParamDef[];
  generate: (baseColor: BaseColor, params: Record<string, number>) => Palette;
  // params values are guaranteed non-null (defaultParams provides defaults)
}

function PaletteGeneratorForm({ config }: { config: GeneratorFormConfig }) {
  const baseColor = usePaletteStore((state) => state.baseColor);

  const [params, setParams] = useState(config.defaultParams);

  function handleParamChange(name: string, value: number) {
    setParams((prev) => ({ ...prev, [name]: value }));
  }

  function handleClick() {
    const colors = config.generate(baseColor, params);
    addPalette(colors);
  }

  return (
    <div className="flex gap-2">
      {config.paramDefs.map((def) => (
        <Input
          key={def.name}
          title={def.label}
          className="w-16 grow"
          aria-label={def.label}
          type="number"
          min={def.min}
          max={def.max}
          value={params[def.name]}
          onChange={(e) => handleParamChange(def.name, parseInt(e.target.value))}
        />
      ))}
      <Button className="w-1/2" onClick={handleClick}>
        {config.label}
      </Button>
    </div>
  );
}

export type { GeneratorFormConfig };
export { PaletteGeneratorForm };
