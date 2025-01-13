import { SidebarProvider } from "@/components/widgets/sidebar/sidebar";
import { signal } from "@preact/signals-react";
import { StrictMode } from "react";
import { ColorPicker } from "./controls/color-picker/color-picker";
import { Generators } from "./controls/generators/generators";
import type { HSLColor } from "./lib/color-conversions";
import { Palettes } from "./palettes";

type Palette = HSLColor[];
export type BaseColor = HSLColor & { location: { x: number; y: number } };

const colorPickerSize = 368;
const palettes = signal<Palette[]>([]);
const baseColor = signal<BaseColor>({
  hue: 180,
  saturation: 100,
  lightness: 50,
  location: { x: 184, y: 184 },
});

function PaletteGenerator() {
  return (
    <SidebarProvider mobilePosition="left" desktopPosition="left">
      <SidebarProvider.Sidebar className="w-96 space-y-4 bg-card p-2">
        <ColorPicker baseColor={baseColor} width={colorPickerSize} height={colorPickerSize} />
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
