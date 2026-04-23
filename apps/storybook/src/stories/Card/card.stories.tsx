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
      options: ["primary", "secondary", "accent", "outline", "ghost", "muted"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

/**
 * The standard card layout using the primary background.
 * Use as the default for experiment settings and toolcards.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
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
 * Uses the secondary background for alternative cards.
 * Good for supporting or secondary content.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
          <CardDescription>Optional configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Advanced options for power users.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Uses the accent background for highlighted cards.
 * Good for call-to-action cards.
 */
export const Accent: Story = {
  args: {
    variant: "accent",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Special Offer</CardTitle>
          <CardDescription>Limited time deal!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get 50% off on your next generation.</p>
        </CardContent>
        <CardFooter>
          <Button>Claim Now</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

/**
 * Card with outline/border only, no background fill.
 * Good for comparison cards or nested content.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <CardHeader>
          <CardTitle>Preview Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card is for preview purposes.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Minimal card with no shadow or border.
 * Good for inline content or dark backgrounds.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <Card {...args}>
        <CardContent>
          <p>Minimal inline card content.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Card with dashed border for metadata or notes.
 * Good for displaying version info or timestamps.
 */
export const Muted: Story = {
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
