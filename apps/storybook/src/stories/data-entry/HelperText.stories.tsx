import { HelperText } from '@repo/ui/data-entry';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof HelperText> = {
  title: 'Data Entry/HelperText',
  component: HelperText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color variant for the hint/validation text.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    icon: {
      description:
        'Show a status icon. Pass true for the default per-variant icon, or a custom ReactNode.',
      control: 'boolean'
    }
  },
  args: {
    children: 'This is a hint for the field above.'
  }
};

export default meta;

type Story = StoryObj<typeof HelperText>;

export const Default: Story = {
  args: { variant: 'default' }
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <HelperText variant="default">Default hint text.</HelperText>
      <HelperText variant="primary">Primary hint text.</HelperText>
      <HelperText variant="secondary">Secondary hint text.</HelperText>
      <HelperText variant="accent">Accent hint text.</HelperText>
      <HelperText variant="warning">Warning hint text.</HelperText>
      <HelperText variant="destructive">Destructive hint text.</HelperText>
    </div>
  )
};

export const WithIcon: Story = {
  args: { icon: true, children: 'Choose a unique username.' }
};

export const DestructiveWithIcon: Story = {
  args: { variant: 'destructive', icon: true, children: 'This field is required.' }
};
