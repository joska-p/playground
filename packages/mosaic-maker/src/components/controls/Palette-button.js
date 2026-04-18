import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMosaicMakerContext } from "../Mosaic-context.js";
import { arePalettesEqual, getPaletteId } from "../lib/palette-utils.js";
import { twMerge } from "tailwind-merge";
function PaletteButton({ palette }) {
    const { currentPalette, updatePalette } = useMosaicMakerContext();
    return (_jsxs("label", { className: twMerge("mm:flex mm:w-fit mm:flex-row", "mm:lg:flex-col", "mm:has-checked:ring-primary mm:has-checked:ring-4", "mm:has-focus-visible:bg-accent mm:has-focus-visible:text-accent-foreground"), children: [_jsx("input", { type: "radio", name: "palette", value: getPaletteId(palette), className: "sr-only", checked: arePalettesEqual(palette, currentPalette), onChange: () => updatePalette(palette), "aria-label": `Color palette ${getPaletteId(palette)}` }), Object.values(palette).map((color, index) => (_jsx("div", { style: { backgroundColor: color }, className: "mm:h-6 mm:w-6 mm:md:h-6 mm:md:w-6" }, index)))] }));
}
export { PaletteButton };
