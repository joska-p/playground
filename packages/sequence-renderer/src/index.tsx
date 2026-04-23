import { Controls } from "./components/controls/Controls.js";
import { SequenceDisplay } from "./components/sequence-display/SequenceDisplay.js";
import { Sidebar } from "@repo/ui";

function SequenceRenderer() {
  return (
    <Sidebar desktopPosition="bottom" mobilePosition="bottom">
      <Sidebar.Main className="relative">
        <SequenceDisplay />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { SequenceRenderer };
