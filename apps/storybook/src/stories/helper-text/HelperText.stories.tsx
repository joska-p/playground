import { HelperText } from '@repo/ui/HelperText';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof HelperText> = {
  title: 'Components/HelperText',
  component: HelperText,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The helper text content.',
      control: 'text'
    },
    destructive: {
      description: 'Shows the text in the destructive/warning color.',
      control: 'boolean'
    }
  },
  args: {
    children: 'This is a helper text.'
  }
};

export default meta;

type Story = StoryObj<typeof HelperText>;

export const Default: Story = {
  args: {
    children: 'Choose a unique name for your project.'
  }
};

export const Destructive: Story = {
  args: {
    children: 'This field has an error.',
    destructive: true
  }
};
