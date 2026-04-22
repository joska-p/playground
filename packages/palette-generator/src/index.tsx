import { ColorPicker } from "./controls/color-picker/ColorPicker.js";
import { Generators } from "./controls/generators/Generators.js";
import { PaletteProvider } from "./context/paletteContext.js";
import { PaletteDisplay } from "./components/PaletteDisplay.js";
import { SidebarProvider } from "@repo/ui";

function PaletteGenerator() {
  return (
    <PaletteProvider>
      <SidebarProvider mobilePosition="left" desktopPosition="left">
        <SidebarProvider.Sidebar className="bg-card w-96 space-y-4 p-2">
          <ColorPicker width={368} height={368} />
          <Generators />
        </SidebarProvider.Sidebar>

        <SidebarProvider.Content className="p-2">
          <PaletteDisplay />
        </SidebarProvider.Content>
      </SidebarProvider>
    </PaletteProvider>
  );
}

export { PaletteGenerator };