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

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Please enter a valid email address.' }
};

export const WithIcon: Story = {
  args: { icon: true, children: 'Choose a unique username.' }
};

export const DestructiveWithIcon: Story = {
  args: { variant: 'destructive', icon: true, children: 'This field is required.' }
};
