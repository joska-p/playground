"use client";

import { MosaicDisplay } from "./components/mosaic-display/MosaicDisplay.js";
import { Controls } from "./components/controls/Controls.js";

function MosaicMaker() {
  return (
    <div className="grid flex-1 grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[1fr_auto] lg:grid-rows-1 overflow-hidden">
      <div className="relative">
        <MosaicDisplay />
      </div>

      <div className="bg-card overflow-y-auto">
        <Controls />
      </div>
    </div>
  );
}

export { MosaicMaker };