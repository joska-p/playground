import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
const Rainbow = ({ colors, rotation, className }) => {
    return (_jsxs("div", { className: twMerge("mm:transition-[transform,background-color] mm:duration-500", className), style: {
            backgroundColor: `var(${colors[0]})`,
            transform: `rotate(var(${rotation}))`,
        }, children: [_jsx("div", { className: "mm:absolute mm:top-0 mm:left-0 mm:h-full mm:w-full mm:rounded-br-full mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[1]})`,
                } }), _jsx("div", { className: "mm:absolute mm:top-0 mm:left-0 mm:h-1/2 mm:w-1/2 mm:rounded-br-full mm:transition-colors mm:duration-500", style: {
                    backgroundColor: `var(${colors[2]})`,
                } })] }));
};
Rainbow.displayName = "Rainbow";
export { Rainbow };
