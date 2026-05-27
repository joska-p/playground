import { Sidebar } from "@repo/ui";
import { Controls } from "./components/controls/Controls";
import { SequenceDisplay } from "./components/sequence-display/SequenceDisplay";

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
