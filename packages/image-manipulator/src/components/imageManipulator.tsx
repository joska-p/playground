import { Sidebar } from "@repo/ui";
import { Controls } from "./controls/controls";
import { Outputs } from "../components/display/Outputs";

function ImageManipulator() {
  return (
    <Sidebar desktopPosition="left" mobilePosition="bottom" className="flex-1">
      <Sidebar.Main className="grid grid-cols-3 gap-6">
        <Outputs />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { ImageManipulator };
