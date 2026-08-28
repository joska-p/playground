import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Checkbox } from '@repo/tlc/components/forms';

const meta = {
    title: 'tlc/Forms/Checkbox',
    component: Checkbox,
    render: (args) => <Checkbox {...args} />,
    args: {
        label: 'Accepter les conditions',
        'aria-label': 'Accepter les conditions'
    }
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
    args: {
        defaultChecked: true
    }
};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const Interactive: Story = {
    play: async ({ canvasElement }) => {
        const checkbox = canvasElement.querySelector('input') as HTMLInputElement | null;
        checkbox?.click();
        await expect(checkbox?.checked).toBe(true);
        checkbox?.click();
        await expect(checkbox?.checked).toBe(false);
    }
};
