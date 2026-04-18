import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMosaicMakerContext } from "../Mosaic-context.js";
import { initialPalette, initialTileSet } from "../config.js";
import { twMerge } from "tailwind-merge";
import { Tile } from "../tiles/Tile.js";
function TileSetControls() {
    const { tileSet, updateTileSet } = useMosaicMakerContext();
    return (_jsx("fieldset", { className: "mm:flex mm:flex-wrap mm:items-center mm:justify-center mm:gap-4 mm:[--rotation:0deg] mm:[--tile-size:32px]", style: { ...initialPalette }, children: initialTileSet.map((tileName) => {
            return (_jsxs("label", { "aria-label": tileName, className: "mm:flex mm:flex-col mm:gap-2", children: [_jsx("input", { type: "checkbox", checked: tileSet.includes(tileName), onChange: () => updateTileSet(tileName), className: "mm:peer mm:sr-only" }), _jsx(Tile, { name: tileName, colors: Object.keys(initialPalette), className: twMerge("mm:opacity-70 mm:transition-opacity", "mm:peer-checked:ring-primary mm:peer-checked:opacity-100 mm:peer-checked:ring-4", "mm:peer-focus-visible:ring-accent mm:peer-focus-visible:ring-4"), rotation: "--rotation-0" })] }, tileName));
        }) }));
}
export { TileSetControls };
