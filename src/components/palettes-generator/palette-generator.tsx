import { StrictMode } from "react";
import { ColorPicker } from "./controls/color-picker/color-picker";
import { Generators } from "./controls/generators/generators";
import { PaletteProvider } from "./palette-context";
import { PaletteDisplay } from "./palette-display";
import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";

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

const StrictModePaletteGenerator = () => (
  <StrictMode>
    <PaletteGenerator />
  </StrictMode>
);

export { StrictModePaletteGenerator };
