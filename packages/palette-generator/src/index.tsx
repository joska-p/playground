import { Sidebar } from "@repo/ui";
import { Display } from "./components/display";
import { Controls } from "./components/controls";

function PaletteGenerator() {
  return (
    <Sidebar mobilePosition="left" desktopPosition="left">
      <Sidebar.Panel className="flex flex-col gap-3 p-3">
        <div className="text-sm font-semibold">Palette Generator</div>
        <Controls />
      </Sidebar.Panel>

      <Sidebar.Main className="p-3">
        <Display />
      </Sidebar.Main>
    </Sidebar>
  );
}

export { PaletteGenerator };
