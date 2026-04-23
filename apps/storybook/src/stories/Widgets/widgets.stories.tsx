import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ColorPalette, ControlGroup, Slider } from "@repo/ui";

const meta: Meta<typeof ColorPalette> = {
  title: "Components/Widgets",
  component: ColorPalette,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Controls the ring color for checked/hover state.",
      options: ["primary", "secondary", "accent"],
      control: { type: "select" },
    },
    size: {
      description: "Controls the cell size.",
      options: ["sm", "md", "lg"],
      control: { type: "select" },
    },
    orientation: {
      description: "Controls the layout direction.",
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
  },
  args: {
    variant: "primary",
    size: "md",
    orientation: "horizontal",
  },
};

export default meta;

type Story = StoryObj<typeof ColorPalette>;

const palettes = [
  { id: "p1", colors: ["#331436", "#eb9961", "#cb4f57", "#7a1745", "#f7f7f7"] },
  { id: "p2", colors: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"] },
  { id: "p3", colors: ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6"] },
];

/**
 * ColorPalette with primary ring color.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => {
    const [selected, setSelected] = useState("p1");
    return (
      <div className="flex flex-wrap gap-4">
        {palettes.map((p) => (
          <ColorPalette
            key={p.id}
            colors={p.colors}
            checked={selected === p.id}
            onChange={() => setSelected(p.id)}
            {...args}
          />
        ))}
      </div>
    );
  },
};

/**
 * ColorPalette with secondary ring color.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => {
    const [selected, setSelected] = useState("p1");
    return (
      <div className="flex flex-wrap gap-4">
        {palettes.map((p) => (
          <ColorPalette
            key={p.id}
            colors={p.colors}
            checked={selected === p.id}
            onChange={() => setSelected(p.id)}
            {...args}
          />
        ))}
      </div>
    );
  },
};

/**
 * ColorPalette with accent ring color.
 */
export const Accent: Story = {
  args: {
    variant: "accent",
  },
  render: (args) => {
    const [selected, setSelected] = useState("p1");
    return (
      <div className="flex flex-wrap gap-4">
        {palettes.map((p) => (
          <ColorPalette
            key={p.id}
            colors={p.colors}
            checked={selected === p.id}
            onChange={() => setSelected(p.id)}
            {...args}
          />
        ))}
      </div>
    );
  },
};

/**
 * ColorPalette in vertical orientation.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    size: "sm",
  },
  render: (args) => {
    const [selected, setSelected] = useState("p1");
    return (
      <div className="flex flex-wrap gap-4">
        {palettes.map((p) => (
          <ColorPalette
            key={p.id}
            colors={p.colors}
            checked={selected === p.id}
            onChange={() => setSelected(p.id)}
            {...args}
          />
        ))}
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
          <select className="w-full cursor-pointer bg-transparent font-mono text-sm outline-none">
            <option>SVG Grid</option>
            <option>PNG Export</option>
            <option>JSON Data</option>
          </select>
        </ControlGroup>
      </div>
    );
  },
};
