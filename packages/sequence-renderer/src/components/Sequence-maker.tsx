import { Controls } from "./controls/Controls.js";
import { SequenceProvider } from "./Sequence-context.js";
import { SequenceDisplay } from "./Sequence-display.js";
import { SidebarProvider } from "@repo/ui";

function SequenceMaker() {
  return (
    <SequenceProvider>
      <SidebarProvider desktopPosition="bottom" mobilePosition={"bottom"}>
        <SidebarProvider.Content className="relative flex h-full w-full overflow-hidden">
          <SequenceDisplay />
        </SidebarProvider.Content>

        <SidebarProvider.Sidebar className="w-full">
          <Controls />
        </SidebarProvider.Sidebar>
      </SidebarProvider>
    </SequenceProvider>
  );
}

export { SequenceMaker };
