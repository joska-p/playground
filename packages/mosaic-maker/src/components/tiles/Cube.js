import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CSS_VARS } from "../config.js";
import { twMerge } from "tailwind-merge";
function Cube({ colors, rotation, className }) {
    return (_jsxs("div", { className: twMerge("mm:transition-transform mm:duration-500", className), style: {
            transform: `rotate(var(${rotation}))`,
            backgroundColor: `var(${colors[0]})`,
        }, children: [_jsx("div", { className: "mm:absolute mm:top-0 mm:left-0 mm:border-solid mm:transition-[border-color] mm:duration-500", style: {
                    borderLeftColor: `var(${colors[1]})`,
                    borderTopColor: `var(${colors[1]})`,
                    borderRightColor: `var(${colors[2]})`,
                    borderBottomColor: `var(${colors[2]})`,
                    borderWidth: `calc(var(${CSS_VARS.width})/2)`,
                } }), _jsx("div", { className: "mm:absolute mm:bottom-0 mm:left-0 mm:bg-inherit mm:transition-[background-color] mm:duration-500", style: {
                    backgroundColor: `var(${colors[3]})`,
                    height: `calc(var(${CSS_VARS.height})/2)`,
                    width: `calc(var(${CSS_VARS.width})/2)`,
                } })] }));
}
Cube.displayName = "Cube";
export { Cube };
