import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '@repo/tlc/components/icons';

const meta = {
    title: 'tlc/Icons/Icon',
    component: Icon,
    render: (args) => <Icon {...args} />,
    args: {
        name: 'sparkles'
    }
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sparkles: Story = {};

export const Home: Story = {
    args: {
        name: 'home'
    }
};

export const Palette: Story = {
    args: {
        name: 'palette'
    }
};

export const Large: Story = {
    args: {
        name: 'generative',
        className: 'h-10 w-10 text-primary'
    }
};
