import { StrictMode } from "react";
import { Controls } from "./controls/controls";
import { MosaicMakerProvider } from "./mosaic-context";
import { MosaicDisplay } from "./mosaic-display";
import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";

function MosaicMaker() {
  return (
    <MosaicMakerProvider>
      <SidebarProvider desktopPosition="right" mobilePosition="bottom">
        <SidebarProvider.Content className="relative">
          <MosaicDisplay />
        </SidebarProvider.Content>

        <SidebarProvider.Sidebar className="bg-card">
          <Controls />
        </SidebarProvider.Sidebar>
      </SidebarProvider>
    </MosaicMakerProvider>
  );
}

function StrictModeMosaicMaker() {
  return (
    <StrictMode>
      <MosaicMaker />
    </StrictMode>
  );
}

export { StrictModeMosaicMaker };
