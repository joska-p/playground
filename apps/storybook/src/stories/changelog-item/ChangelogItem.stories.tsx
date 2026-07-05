import { ChangelogItem } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ChangelogItem> = {
  title: 'Stylistic/Molecules/ChangelogItem',
  component: ChangelogItem,
  tags: ['autodocs'],
  argTypes: {
    version: {
      description: 'Version number displayed on the left.',
      control: 'text'
    },
    children: {
      description: 'The changelog description.',
      control: 'text'
    }
  },
  args: {
    version: 'v1.0.0',
    children: 'Initial release with core components and experiments.'
  }
};

export default meta;

type Story = StoryObj<typeof ChangelogItem>;

export const Default: Story = {};

export const Patch: Story = {
  args: {
    version: 'v1.0.1',
    children: 'Fixed an issue with the slider component not updating correctly.'
  }
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ChangelogItem version="v2.0.0">
        Major redesign of the control panel and new experiment types.
      </ChangelogItem>
      <ChangelogItem version="v1.5.0">
        Added dark mode support and keyboard shortcuts.
      </ChangelogItem>
      <ChangelogItem version="v1.2.3">
        Bug fixes for the export functionality and performance improvements.
      </ChangelogItem>
    </div>
  )
};
