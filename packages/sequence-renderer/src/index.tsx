import { Controls } from "./components/controls/Controls.js";
import { SequenceProvider } from "./context/sequenceContext.js";
import { SequenceDisplay } from "./components/sequence-display/SequenceDisplay.js";
import { SidebarProvider } from "@repo/ui";

function SequenceRenderer() {
  return (
    <SequenceProvider>
      <SidebarProvider desktopPosition="bottom" mobilePosition={"bottom"}>
        <SidebarProvider.Content className="relative h-full w-full overflow-hidden">
          <SequenceDisplay />
        </SidebarProvider.Content>

        <SidebarProvider.Sidebar className="w-full">
          <Controls />
        </SidebarProvider.Sidebar>
      </SidebarProvider>
    </SequenceProvider>
  );
}

export { SequenceRenderer };
