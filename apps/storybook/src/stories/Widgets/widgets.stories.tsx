import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ColorPalette, ControlGroup, Slider } from "@repo/ui";

const meta: Meta = {
  title: "Components/Widgets",
  tags: ["autodocs"],
};

export default meta;

/**
 * A reusable Color Palette component for display or selection.
 */
export const ColorPaletteStory: StoryObj<typeof ColorPalette> = {
  name: "ColorPalette",
  render: () => {
    const [selected, setSelected] = useState("p1");
    const palettes = [
      {
        id: "p1",
        colors: ["#331436", "#eb9961", "#cb4f57", "#7a1745", "#f7f7f7"],
      },
      {
        id: "p2",
        colors: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
      },
      {
        id: "p3",
        colors: ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6"],
      },
    ];

    return (
      <div className="flex flex-col gap-8 p-4 bg-background border border-border rounded-xl">
        <section>
          <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Display Only
          </h3>
          <ColorPalette colors={palettes[0].colors} />
        </section>

        <section>
          <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Interactive Picker
          </h3>
          <div className="flex flex-wrap gap-4">
            {palettes.map((p) => (
              <ColorPalette
                key={p.id}
                colors={p.colors}
                checked={selected === p.id}
                onChange={() => setSelected(p.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4 font-mono text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Vertical Size SM
          </h3>
          <ColorPalette
            colors={palettes[2].colors}
            orientation="vertical"
            size="sm"
          />
        </section>
      </div>
    );
  },
};

/**
 * Standard container for sidebar controls.
 */
export const ControlGroupStory: StoryObj<typeof ControlGroup> = {
  name: "ControlGroup",
  render: () => {
    const [val, setVal] = useState(64);
    return (
      <div className="max-w-xs space-y-4">
        <ControlGroup label="Tile Size" valueDisplay={`${val}px`}>
          <Slider min={32} max={128} value={val} onChange={setVal} />
        </ControlGroup>

        <ControlGroup label="Export Mode">
          <select className="w-full bg-transparent font-mono text-sm outline-none cursor-pointer">
            <option>SVG Grid</option>
            <option>PNG Export</option>
            <option>JSON Data</option>
          </select>
        </ControlGroup>
      </div>
    );
  },
};
