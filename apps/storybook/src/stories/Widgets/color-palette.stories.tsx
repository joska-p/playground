import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPalette } from "@repo/ui";
import { fn } from "storybook/test";

/**
 * A reusable Color Palette component that displays a series of colors.
 * It functions as a radio input, allowing users to select a palette.
 */
const meta: Meta<typeof ColorPalette> = {
  title: "Widgets/ColorPalette",
  component: ColorPalette,
  tags: ["autodocs"],
  argTypes: {
    colors: {
      description: "An array of CSS color strings to display in the palette.",
      control: "object",
    },
    orientation: {
      description: "The layout orientation of the color cells.",
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    size: {
      description: "The size of each color cell.",
      options: ["sm", "default", "lg"],
      control: { type: "select" },
    },
    variant: {
      description: "Visual style of the palette border and selection ring.",
      options: ["primary", "secondary", "accent"],
      control: { type: "select" },
    },
    checked: {
      description: "Whether this palette is currently selected.",
      control: "boolean",
    },
  },
  args: {
    onChange: fn(),
    colors: ["#282828", "#cc241d", "#98971a", "#d79921", "#458588"],
    name: "demo-palette",
  },
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

/**
 * Primary variant with horizontal orientation.
 */
export const PrimaryHorizontal: Story = {
  args: {
    variant: "primary",
    orientation: "horizontal",
    checked: true,
  },
};

/**
 * Secondary variant with vertical orientation.
 */
export const SecondaryVertical: Story = {
  args: {
    variant: "secondary",
    orientation: "vertical",
    colors: ["#fb4934", "#b8bb26", "#fabd2f", "#83a598", "#d3869b"],
    checked: true,
  },
};

/**
 * Accent variant with large cells.
 */
export const AccentLarge: Story = {
  args: {
    variant: "accent",
    size: "lg",
    colors: ["#ebdbb2", "#d5c4a1", "#bdae93", "#a89984", "#928374"],
    checked: true,
  },
};

/**
 * Small cells for compact UI areas.
 */
export const SmallCompact: Story = {
  args: {
    size: "sm",
    variant: "primary",
  },
};
