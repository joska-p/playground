"use client";

import { MosaicMakerProvider } from "./Mosaic-context";
import { MosaicDisplay } from "./Mosaic-display";
import { Controls } from "./controls/Controls";

function MosaicMaker() {
  return (
    <MosaicMakerProvider>
      <div className="mm:grid mm:h-full mm:min-h-screen mm:grid-cols-1 mm:grid-rows-[1fr_auto] mm:lg:grid-cols-[1fr_auto] mm:lg:grid-rows-1">
        <div className="mm:relative">
          <MosaicDisplay />
        </div>

        <div className="mm:bg-card">
          <Controls />
        </div>
      </div>
    </MosaicMakerProvider>
  );
}

export { MosaicMaker };
