"use client";

import { MosaicDisplay } from "./components/mosaic-display/MosaicDisplay.js";
import { Controls } from "./components/controls/Controls.js";
import { SidebarProvider } from "@repo/ui";

function MosaicMaker() {
  return (
    <SidebarProvider desktopPosition="right" mobilePosition={"bottom"}>
      <SidebarProvider.Content className="relative">
        <MosaicDisplay />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar>
        <Controls />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
}

export { MosaicMaker };
