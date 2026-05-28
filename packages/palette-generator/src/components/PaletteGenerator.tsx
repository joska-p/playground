import { Sidebar } from "@repo/ui/Sidebar";
import { Controls } from "./controls/Controls";
import { Display } from "./display/Display";

function PaletteGenerator() {
  return (
    <Sidebar mobilePosition="left" desktopPosition="left">
      <Sidebar.Panel className="flex flex-col gap-3 p-3">
        <Controls />
      </Sidebar.Panel>

      <Sidebar.Main className="p-3">
        s
        <Display />
      </Sidebar.Main>
    </Sidebar>
  );
}

export { PaletteGenerator };
