import { StrictMode } from "react";
import { Controls } from "./controls";
import { RacamanProvider } from "./racaman-context";
import { RacamanDisplay } from "./racaman-display";
import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";

function Racaman() {
  return (
    <RacamanProvider>
      <SidebarProvider desktopPosition="bottom" mobilePosition={"bottom"}>
        <SidebarProvider.Content className="relative">
          <RacamanDisplay />
        </SidebarProvider.Content>

        <SidebarProvider.Sidebar>
          <Controls />
        </SidebarProvider.Sidebar>
      </SidebarProvider>
    </RacamanProvider>
  );
}

function StrictModeRacaman() {
  return (
    <StrictMode>
      <Racaman />
    </StrictMode>
  );
}

export { Racaman, StrictModeRacaman };
