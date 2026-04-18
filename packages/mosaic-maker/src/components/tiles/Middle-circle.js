import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
function MiddleCircle({ colors, rotation, className }) {
    return (_jsxs("div", { className: twMerge("mm:flex mm:items-center mm:justify-center mm:transition-[transform,background-color] mm:duration-500", className), style: {
            backgroundColor: `var(${colors[0]})`,
            transform: `rotate(var(${rotation}))`,
        }, children: [_jsx("div", { className: "mm:h-1/2 mm:w-1/4 mm:rounded-l-full mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[1]})`,
                } }), _jsx("div", { className: "mm:h-1/2 mm:w-1/4 mm:rounded-r-full mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[2]})`,
                } })] }));
}
MiddleCircle.displayName = "MiddleCircle";
export { MiddleCircle };
