import { Sidebar } from "@repo/ui";
import { Controls } from "./components/controls/Controls";
import { Display } from "./components/display/Display";

function PaletteGenerator() {
  return (
    <Sidebar mobilePosition="left" desktopPosition="left" className="min-h-[inherit]">
      <Sidebar.Panel className="flex flex-col gap-3 p-3">
        <Controls />
      </Sidebar.Panel>

      <Sidebar.Main className="p-3">
        <Display />
      </Sidebar.Main>
    </Sidebar>
  );
}

export { PaletteGenerator };
