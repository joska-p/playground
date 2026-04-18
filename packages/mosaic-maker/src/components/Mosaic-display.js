import { jsx as _jsx } from "react/jsx-runtime";
import { useMosaicMakerContext } from "./Mosaic-context.js";
import { CSS_VARS, initialGapSize, initialPalette, initialRotations, initialTileSize, } from "./config.js";
import { getRandom } from "./lib/utils.js";
import { Tile } from "./tiles/Tile.js";
const MOSAIC_STYLES = {
    ...initialPalette,
    ...initialTileSize,
    ...initialGapSize,
    ...initialRotations,
    gridTemplateColumns: `repeat(auto-fill,var(${CSS_VARS.width}))`,
    gridTemplateRows: `repeat(auto-fill,var(${CSS_VARS.height}))`,
    gap: `var(${CSS_VARS.gap})`,
};
function generateTileColors() {
    const paletteKeys = Object.keys(initialPalette);
    return Array.from({ length: 5 }, () => getRandom(paletteKeys));
}
function generateTileRotations() {
    const rotationKeys = Object.keys(initialRotations);
    return getRandom(rotationKeys);
}
function MosaicDisplay() {
    const { mosaicRef, tiles } = useMosaicMakerContext();
    return (_jsx("div", { ref: mosaicRef, className: "mm:absolute mm:inset-0 mm:mt-2 mm:grid mm:content-start mm:justify-center mm:overflow-hidden", style: MOSAIC_STYLES, children: tiles.map((tile, index) => (_jsx(Tile, { name: tile, colors: generateTileColors(), rotation: generateTileRotations() }, `${tile}-${index}`))) }));
}
export { MosaicDisplay };
