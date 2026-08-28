import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '@repo/tlc/components/display';

const meta = {
    title: 'tlc/Display/Badge',
    component: Badge,
    render: (args) => <Badge {...args}>Badge</Badge>
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: {
        variant: 'primary'
    }
};

export const Accent: Story = {
    args: {
        variant: 'accent'
    }
};

export const WithDot: Story = {
    args: {
        dot: true
    }
};

export const Large: Story = {
    args: {
        size: 'lg'
    }
};
