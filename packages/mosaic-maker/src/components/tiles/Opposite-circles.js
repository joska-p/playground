import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
function OppositeCircles({ colors, rotation, className }) {
    return (_jsxs("div", { className: twMerge("mm:transition-[transform,background-color] mm:duration-500", className), style: {
            backgroundColor: `var(${colors[0]})`,
            transform: `rotate(var(${rotation}))`,
        }, children: [_jsx("div", { style: {
                    backgroundColor: `var(${colors[1]})`,
                }, className: "mm:absolute mm:right-1/2 mm:h-full mm:w-1/2 mm:rounded-r-full mm:transition-colors mm:duration-500" }), _jsx("div", { style: {
                    backgroundColor: `var(${colors[2]})`,
                }, className: "mm:absolute mm:left-1/2 mm:h-full mm:w-1/2 mm:rounded-l-full mm:transition-colors mm:duration-500" })] }));
}
OppositeCircles.displayName = "OppositeCircles";
export { OppositeCircles };
