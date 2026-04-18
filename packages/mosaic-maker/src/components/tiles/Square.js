import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
function Square({ colors, rotation, className }) {
    const squareStyle = {
        transform: `rotate(var(${rotation}))`,
    };
    return (_jsxs("div", { className: twMerge("mm:tile grid mm:grid-cols-2 mm:grid-rows-2 mm:transition-transform mm:duration-500", className), style: squareStyle, children: [_jsx("div", { className: "mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[1]})`,
                } }), _jsx("div", { className: "mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[2]})`,
                } }), _jsx("div", { className: "mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[3]})`,
                } }), _jsx("div", { className: "mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[4]})`,
                } })] }));
}
Square.displayName = "Square";
export { Square };
