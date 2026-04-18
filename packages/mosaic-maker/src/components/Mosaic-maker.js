"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MosaicMakerProvider } from "./Mosaic-context.js";
import { MosaicDisplay } from "./Mosaic-display.js";
import { Controls } from "./controls/Controls.js";
function MosaicMaker() {
    return (_jsx(MosaicMakerProvider, { children: _jsxs("div", { className: "mm:grid mm:h-full mm:min-h-screen mm:grid-cols-1 mm:grid-rows-[1fr_auto] mm:lg:grid-cols-[1fr_auto] mm:lg:grid-rows-1", children: [_jsx("div", { className: "mm:relative", children: _jsx(MosaicDisplay, {}) }), _jsx("div", { className: "mm:bg-card", children: _jsx(Controls, {}) })] }) }));
}
export { MosaicMaker };
