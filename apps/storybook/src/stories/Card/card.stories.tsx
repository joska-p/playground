import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@repo/ui";

/**
 * The Card component provides a flexible container for grouping related content and actions.
 * It is a core part of the Mosaic Maker and Data Viz layouts in the playground.
 */
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Controls the background and border style of the card.",
      options: ["default", "muted"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

/**
 * The standard layout used for experiment settings and toolcards.
 */
export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Project Configuration</CardTitle>
          <CardDescription>Adjust the parameters for your current experiment.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Configure particle density and canvas resolution before generating.</p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset</Button>
          <Button>Generate</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

/**
 * A subtle variation for less prominent information or sidebars.
 */
export const MutedVariant: Story = {
  args: {
    variant: "muted",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs">Generated on 2024-05-20. Version 1.0.4-beta.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
