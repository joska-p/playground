import type { IconName } from '@repo/ui/icons';
import { Icon, iconArray } from '@repo/ui/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Icon> = {
  title: 'Icons/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: 'Icon identifier from the icon set.',
      options: iconArray.map((i) => i.name),
      control: { type: 'select' }
    },
    className: {
      description: 'CSS class to control size, color, etc.',
      control: 'text'
    }
  },
  args: {
    className: 'h-6 w-6'
  }
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: 'home' as IconName }
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {iconArray.map(({ name }) => (
        <div
          key={name}
          className="text-foreground-muted flex w-24 flex-col items-center gap-2 rounded-lg p-3 text-center text-xs hover:bg-white/5"
        >
          <Icon
            name={name as IconName}
            className="h-6 w-6"
          />
          <span className="truncate">{name}</span>
        </div>
      ))}
    </div>
  )
};
