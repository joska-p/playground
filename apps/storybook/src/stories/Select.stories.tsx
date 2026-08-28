import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Select } from '@repo/tlc/components/forms';

const options = [
    { label: 'Pomme', value: 'apple' },
    { label: 'Poire', value: 'pear' },
    { label: 'Banane', value: 'banana' }
];

const meta = {
    title: 'tlc/Forms/Select',
    component: Select,
    render: (args) => <Select {...args} className="min-w-40" />,
    args: {
        options,
        'aria-label': 'Choisir un fruit'
    }
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const Interactive: Story = {
    play: async ({ canvasElement }) => {
        const select = canvasElement.querySelector('select') as HTMLSelectElement | null;
        select?.click();
        select?.focus();
        select?.dispatchEvent(new Event('change', { bubbles: true }));
        await expect(select).not.toBeNull();
    }
};
