import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { StrictMode } from "react";
import { MosaicMakerProvider } from "./context";
import { Controls } from "./controls/controls";
import { Mosaic } from "./mosaic";

function MosaicMaker() {
  return (
    <MosaicMakerProvider>
      <SidebarProvider desktopPosition="right" mobilePosition="bottom">
        <SidebarProvider.Content className="relative">
          <Mosaic />
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
