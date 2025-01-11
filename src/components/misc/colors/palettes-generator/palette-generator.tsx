import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { signal } from "@preact/signals-react";
import { StrictMode } from "react";
import { ColorPicker } from "./color-picker/color-picker";
import { Generators } from "./generators/generators";
import type { HSLColor } from "./lib/color-conversions";
import { Palettes } from "./palettes";

type Palette = HSLColor[];

const baseColor = signal<HSLColor>({ hue: 180, saturation: 100, lightness: 50 });
const palettes = signal<Palette[]>([]);

function PaletteGenerator() {
  console.log(palettes.value);
  return (
    <SidebarProvider mobilePosition="left" desktopPosition="left">
      <SidebarProvider.Sidebar className="space-y-2 bg-card p-2">
        <ColorPicker baseColor={baseColor} />
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
