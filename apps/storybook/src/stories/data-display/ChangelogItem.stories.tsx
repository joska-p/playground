import { ChangelogItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ChangelogItem> = {
  title: 'Data Display/ChangelogItem',
  component: ChangelogItem,
  tags: ['autodocs'],
  argTypes: {
    version: {
      description: 'Version identifier shown on the left.',
      control: 'text'
    },
    variant: {
      description: 'Accent color for the version label.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive', 'ghost'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ChangelogItem>;

export const Default: Story = {
  args: {
    variant: 'default',
    version: 'v2.1',
    children: 'Added support for custom color palettes in the generative engine.'
  }
};

export const Patch: Story = {
  args: {
    version: 'v2.0.1',
    children: 'Fixed a race condition in the render pipeline that caused occasional flickering.'
  }
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ChangelogItem
        variant="accent"
        version="v3.0"
      >
        Major overhaul of the shader compiler with support for WebGPU.
      </ChangelogItem>
      <ChangelogItem
        variant="primary"
        version="v2.1"
      >
        Added preset management and experiment sharing.
      </ChangelogItem>
      <ChangelogItem
        variant="default"
        version="v2.0"
      >
        Initial public release with core generative features.
      </ChangelogItem>
    </div>
  )
};
