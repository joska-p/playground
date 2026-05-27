"use client";

import { Sidebar } from "@repo/ui";
import { Controls } from "./components/controls/Controls.js";
import { MosaicDisplay } from "./components/mosaic-display/MosaicDisplay.js";

function MosaicMaker() {
  return (
    <Sidebar desktopPosition="right" mobilePosition="bottom">
      <Sidebar.Main>
        <MosaicDisplay />
      </Sidebar.Main>

      <Sidebar.Panel className="p-2">
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { MosaicMaker };
