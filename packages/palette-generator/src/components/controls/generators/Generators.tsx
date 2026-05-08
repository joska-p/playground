import { generateAnalogous, generateComplementary, generateMonochromatic, generateXadic } from "../../../utils/paletteGenerators.js";
import { PaletteGeneratorForm } from "./PaletteGeneratorForm.js";
import type { GeneratorFormConfig } from "./PaletteGeneratorForm.js";

const monochromaticConfig = {
  label: "Monochromatic",
  defaultParams: { angle: 20, length: 5 },
  paramDefs: [
    { name: "angle", label: "Angle", min: 0, max: 100 },
    { name: "length", label: "Number of colors", min: 1, max: 20 },
  ],
  generate: (baseColor, params) =>
    generateMonochromatic(baseColor, { angle: params["angle"]!, length: params["length"]! }),
} satisfies GeneratorFormConfig;

const xadicConfig = {
  label: "Xadic",
  defaultParams: { angle: 120, length: 3 },
  paramDefs: [
    { name: "angle", label: "Angle", min: 0, max: 360 },
    { name: "length", label: "Number of colors", min: 1, max: 20 },
  ],
  generate: (baseColor, params) =>
    generateXadic(baseColor, { angle: params["angle"]!, length: params["length"]! }),
} satisfies GeneratorFormConfig;

const analogousConfig = {
  label: "Analogous",
  defaultParams: { split: 30, length: 3 },
  paramDefs: [
    { name: "split", label: "Split", min: 0, max: 360 },
    { name: "length", label: "Number of colors", min: 1, max: 20 },
  ],
  generate: (baseColor, params) =>
    generateAnalogous(baseColor, { split: params["split"]!, length: params["length"]! }),
} satisfies GeneratorFormConfig;

const complementaryConfig = {
  label: "Complementary",
  defaultParams: { split: 30, length: 3 },
  paramDefs: [
    { name: "split", label: "Split", min: 0, max: 360 },
    { name: "length", label: "Number of colors", min: 1, max: 20 },
  ],
  generate: (baseColor, params) =>
    generateComplementary(baseColor, { split: params["split"]!, length: params["length"]! }),
} satisfies GeneratorFormConfig;

function Generators() {
  return (
    <>
      <PaletteGeneratorForm config={monochromaticConfig} />
      <PaletteGeneratorForm config={xadicConfig} />
      <PaletteGeneratorForm config={analogousConfig} />
      <PaletteGeneratorForm config={complementaryConfig} />
    </>
  );
}

export { Generators };
