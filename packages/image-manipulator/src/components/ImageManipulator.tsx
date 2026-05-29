import { Sidebar } from "@repo/ui/Sidebar";
import { Outputs } from "../components/display/Outputs";
import { Controls } from "./controls/Controls";

function ImageManipulator() {
  return (
    <Sidebar desktopPosition="left" mobilePosition="bottom" className="min-h-screen flex-1">
      <Sidebar.Main>
        <Outputs />
      </Sidebar.Main>

      <Sidebar.Panel>
        <Controls />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export { ImageManipulator };
