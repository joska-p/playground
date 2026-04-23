"use client";

import { MosaicDisplay } from "./components/mosaic-display/MosaicDisplay.js";
import { Controls } from "./components/controls/Controls.js";
import { Sidebar } from "@repo/ui";

function MosaicMaker() {
  return (
    <Sidebar desktopPosition="right" mobilePosition="bottom">
      <Sidebar.Toggle className="hover:bg-accent rounded-md p-2" />
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
