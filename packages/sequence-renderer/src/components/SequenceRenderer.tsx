import { Sidebar } from "@repo/ui/Sidebar";
import { Controls } from "./controls/Controls";
import { SequenceDisplay } from "./sequence-display/SequenceDisplay";

function SequenceRenderer() {
  return (
    <Sidebar desktopPosition="bottom" mobilePosition="bottom">
      <Sidebar.Main>
        <SequenceDisplay />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { SequenceRenderer };
