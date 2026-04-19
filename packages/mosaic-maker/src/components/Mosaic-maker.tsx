"use client";

import { MosaicMakerProvider } from "./Mosaic-context.js";
import { MosaicDisplay } from "./Mosaic-display.js";
import { Controls } from "./controls/Controls.js";

function MosaicMaker() {
  return (
    <MosaicMakerProvider>
      <div className="grid h-full min-h-screen grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[1fr_auto] lg:grid-rows-1">
        <div className="relative">
          <MosaicDisplay />
        </div>

        <div className="bg-card">
          <Controls />
        </div>
      </div>
    </MosaicMakerProvider>
  );
}

export { MosaicMaker };
