import { ColorPicker } from "./components/controls/color-picker/ColorPicker.js";
import { Generators } from "./components/controls/generators/Generators.js";
import { PaletteProvider } from "./context/paletteContext.js";
import { PaletteDisplay } from "./components/PaletteDisplay.js";
import { Sidebar } from "@repo/ui";

function PaletteGenerator() {
  return (
    <PaletteProvider>
      <Sidebar mobilePosition="left" desktopPosition="left">
        <Sidebar.Panel className="flex flex-col items-start justify-between gap-4 p-4">
          <ColorPicker width={368} height={368} />
          <Generators />
        </Sidebar.Panel>

        <Sidebar.Main className="p-2">
          <PaletteDisplay />
        </Sidebar.Main>
      </Sidebar>
    </PaletteProvider>
  );
}

export { PaletteGenerator };
