import { Sidebar } from "@repo/ui";
import { Controls } from "./components/controls";
import { Display } from "./components/display";

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
