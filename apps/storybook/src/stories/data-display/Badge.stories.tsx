import { Badge } from '@repo/ui/data-display';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'],
      control: { type: 'select' }
    },
    appearance: {
      options: ['soft', 'solid', 'outline'],
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    dot: { control: 'boolean' },
    children: { control: 'text' }
  },
  args: {
    children: 'Badge'
  }
};

export default meta;

type Story = StoryObj<typeof Badge>;

const VARIANTS = ['default', 'primary', 'secondary', 'accent', 'warning', 'destructive'] as const;

const APPEARANCES = ['soft', 'solid', 'outline'] as const;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {APPEARANCES.map((appearance) => (
        <div key={appearance}>
          <p className="text-foreground-dim mb-2 text-xs font-medium tracking-wider uppercase">
            {appearance}
          </p>
          <div className="grid grid-cols-6 gap-3">
            {VARIANTS.map((variant) => (
              <Badge
                key={`${appearance}-${variant}`}
                variant={variant}
                appearance={appearance}
              >
                {variant}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

export const Dot: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {APPEARANCES.map((appearance) => (
        <div key={appearance}>
          <p className="text-foreground-dim mb-2 text-xs font-medium tracking-wider uppercase">
            {appearance}
          </p>
          <div className="grid grid-cols-6 gap-3">
            {VARIANTS.map((variant) => (
              <Badge
                key={`${appearance}-${variant}`}
                variant={variant}
                appearance={appearance}
                dot
              >
                {variant}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};
