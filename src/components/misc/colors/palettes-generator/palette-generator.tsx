import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { signal } from "@preact/signals-react";
import { StrictMode } from "react";
import { ColorPicker } from "./controls/color-picker/color-picker";
import { Generators } from "./controls/generators/generators";
import type { HSLColor } from "./lib/color-conversions";
import { Palettes } from "./palettes";

type Palette = HSLColor[];

const baseColor = signal<HSLColor>({ hue: 180, saturation: 100, lightness: 50 });
const marker = signal({ x: 150, y: 150 });
const palettes = signal<Palette[]>([]);

function PaletteGenerator() {
  return (
    <SidebarProvider mobilePosition="left" desktopPosition="left">
      <SidebarProvider.Sidebar className="w-96 space-y-4 bg-card p-2">
        <ColorPicker baseColor={baseColor} marker={marker} />
        <Generators palettes={palettes} baseColor={baseColor} />
      </SidebarProvider.Sidebar>

      <SidebarProvider.Content className="p-2">
        <Palettes palettes={palettes} />
      </SidebarProvider.Content>
    </SidebarProvider>
  );
}

const StrictModePaletteGenerator = () => (
  <StrictMode>
    <PaletteGenerator />
  </StrictMode>
);

export { StrictModePaletteGenerator };
