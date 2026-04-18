import { jsx as _jsx } from "react/jsx-runtime";
import { CSS_VARS } from "../config.js";
import { twMerge } from "tailwind-merge";
function Triangles({ colors, rotation, className }) {
    return (_jsx("div", { className: twMerge("mm:border-solid mm:transition-[transform,border-color] mm:duration-500", className), style: {
            transform: `rotate(var(${rotation}))`,
            borderTopColor: `var(${colors[1]})`,
            borderRightColor: `var(${colors[2]})`,
            borderBottomColor: `var(${colors[3]})`,
            borderLeftColor: `var(${colors[4]})`,
            borderStyle: "solid",
            borderWidth: `calc(var(${CSS_VARS.width})/2)`,
        } }));
}
Triangles.displayName = "Triangles";
export { Triangles };
