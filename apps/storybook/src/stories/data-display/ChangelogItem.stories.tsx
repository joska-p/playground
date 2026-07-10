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
      description: 'Accent color for the left border.',
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ChangelogItem>;

export const Default: Story = {
  args: {
    variant: 'primary',
    version: 'v2.1',
    children: 'Added support for custom color palettes in the generative engine.'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ChangelogItem
        variant="default"
        version="v1.0"
      >
        Default variant with neutral border accent.
      </ChangelogItem>
      <ChangelogItem
        variant="primary"
        version="v2.0"
      >
        Primary variant with brand-colored border.
      </ChangelogItem>
      <ChangelogItem
        variant="secondary"
        version="v2.1"
      >
        Secondary variant for muted emphasis.
      </ChangelogItem>
      <ChangelogItem
        variant="accent"
        version="v2.2"
      >
        Accent variant for highlighted entries.
      </ChangelogItem>
      <ChangelogItem
        variant="warning"
        version="v2.3"
      >
        Warning variant for deprecation notices.
      </ChangelogItem>
      <ChangelogItem
        variant="destructive"
        version="v2.4"
      >
        Destructive variant for breaking changes.
      </ChangelogItem>
    </div>
  )
};
