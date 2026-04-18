import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
function Diamond({ colors, rotation, className }) {
    return (_jsxs("div", { className: twMerge("mm:transition-[transform,background-color] mm:duration-500", className), style: {
            backgroundColor: `var(${colors[0]})`,
            transform: `rotate(var(${rotation}))`,
        }, children: [_jsx("div", { className: "mm:absolute mm:inset-0 mm:transition-colors mm:duration-500", style: {
                    clipPath: "polygon(50% 0, 100% 0, 100% 50%)",
                    backgroundColor: `var(${colors[1]})`,
                } }), _jsx("div", { className: "mm:absolute mm:inset-0 mm:transition-colors mm:duration-500", style: {
                    clipPath: "polygon(100% 50%, 100% 100%, 50% 100%)",
                    backgroundColor: `var(${colors[2]})`,
                } }), _jsx("div", { className: "mm:absolute mm:inset-0 mm:transition-colors mm:duration-500", style: {
                    clipPath: "polygon(50% 100%, 0 100%, 0 50%)",
                    backgroundColor: `var(${colors[3]})`,
                } }), _jsx("div", { className: "mm:absolute mm:inset-0 mm:transition-colors mm:duration-500", style: {
                    clipPath: "polygon(0 50%, 0 0, 50% 0)",
                    backgroundColor: `var(${colors[4]})`,
                } })] }));
}
Diamond.displayName = "Diamond";
export { Diamond };
