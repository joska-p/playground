import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
import { CornerCircles } from "./Corner-circles.js";
import { Cube } from "./Cube.js";
import { Diamond } from "./Diamond.js";
import { MiddleCircle } from "./Middle-circle.js";
import { OppositeCircles } from "./Opposite-circles.js";
import { Rainbow } from "./Rainbow.js";
import { Square } from "./Square.js";
import { Triangles } from "./Triangles.js";
const tileComponents = {
    CornerCircles,
    Diamond,
    MiddleCircle,
    OppositeCircles,
    Rainbow,
    Square,
    Triangles,
    Cube,
};
function Tile({ name, colors, rotation, className }) {
    if (colors.length < 5) {
        throw new Error("Tile component requires exactly 5 colors");
    }
    const TileComponent = tileComponents[name];
    if (!TileComponent) {
        return null;
    }
    return (_jsx(TileComponent, { colors: colors, rotation: rotation, className: twMerge("mm:relative mm:h-(--tile-size) mm:w-(--tile-size) mm:overflow-hidden", className) }));
}
Tile.displayName = "Tile";
export { Tile };
