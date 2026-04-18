import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
function CornerCircles({ colors, rotation, className }) {
    return (_jsxs("div", { className: twMerge("mm:transition-[transform,background-color] mm:duration-500", className), style: {
            backgroundColor: `var(${colors[0]})`,
            transform: `rotate(var(${rotation}))`,
        }, children: [_jsx("div", { style: {
                    backgroundColor: `var(${colors[1]})`,
                }, className: "mm:absolute mm:top-0 mm:left-0 mm:h-1/2 mm:w-1/2 mm:rounded-br-full mm:transition-colors mm:duration-500" }), _jsx("div", { style: {
                    backgroundColor: `var(${colors[2]})`,
                }, className: "mm:absolute mm:right-0 mm:bottom-0 mm:h-1/2 mm:w-1/2 mm:rounded-tl-full mm:transition-colors mm:duration-500" })] }));
}
CornerCircles.displayName = "CornerCircles";
export { CornerCircles };
