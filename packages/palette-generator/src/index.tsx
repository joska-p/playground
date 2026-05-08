import { ColorPicker } from "./components/color-picker/ColorPicker.js";
import { Controls } from "./components/controls/Controls.js";
import { PaletteDisplay } from "./components/palette-display/PaletteDisplay.js";
import { Sidebar } from "@repo/ui";

function PaletteGenerator() {
  return (
    <Sidebar mobilePosition="left" desktopPosition="left">
      <Sidebar.Panel className="flex flex-col items-start justify-between gap-4 p-4">
        <ColorPicker width={368} height={368} />
        <Controls />
      </Sidebar.Panel>

      <Sidebar.Main className="p-2">
        <PaletteDisplay />
      </Sidebar.Main>
    </Sidebar>
  );
}

export { PaletteGenerator };
