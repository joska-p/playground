import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch, Label } from "@repo/ui";

const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "dangerous"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center space-x-2">
        <Switch
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
          id="airplane-mode"
        />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    );
  },
};

export const Dangerous: Story = {
  args: {
    variant: "dangerous",
  },
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="flex items-center space-x-2">
        <Switch
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
          id="self-destruct"
        />
        <Label htmlFor="self-destruct">Self Destruct</Label>
      </div>
    );
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="flex items-center space-x-2">
        <Switch
          {...args}
          checked={checked}
          onCheckedChange={setChecked}
          id="notifications"
        />
        <Label htmlFor="notifications" className="text-xs">
          Notifications
        </Label>
      </div>
    );
  },
};
