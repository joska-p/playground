"use client";

import { Sidebar } from "@repo/ui/Sidebar";
import { Controls } from "./controls/Controls";
import { MosaicDisplay } from "./MosaicDisplay";

function MosaicMaker() {
  return (
    <Sidebar desktopPosition="right" mobilePosition="bottom">
      <Sidebar.Main>
        <MosaicDisplay />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { MosaicMaker };
