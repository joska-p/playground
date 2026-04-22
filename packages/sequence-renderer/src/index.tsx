import { Controls } from "./components/controls/Controls.js";
import { SequenceDisplay } from "./components/sequence-display/SequenceDisplay.js";
import { SidebarProvider } from "@repo/ui";

function SequenceRenderer() {
  return (
    <SidebarProvider desktopPosition="bottom" mobilePosition={"bottom"}>
      <SidebarProvider.Content className="relative">
        <SequenceDisplay />
      </SidebarProvider.Content>

      <SidebarProvider.Sidebar>
        <Controls />
      </SidebarProvider.Sidebar>
    </SidebarProvider>
  );
}

export { SequenceRenderer };
