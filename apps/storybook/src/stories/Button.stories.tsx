import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@repo/tlc/components/forms';

const meta = {
    title: 'tlc/Forms/Button',
    component: Button,
    render: (args) => <Button {...args}>Bouton</Button>
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default'
    }
};

export const Primary: Story = {
    args: {
        variant: 'primary'
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost'
    }
};

export const Destructive: Story = {
    args: {
        variant: 'destructive'
    }
};

export const Small: Story = {
    args: {
        variant: 'primary',
        size: 'sm'
    }
};

export const Disabled: Story = {
    args: {
        variant: 'primary',
        disabled: true
    }
};
