import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { Toggle } from '@repo/tlc/components/forms';

const meta = {
    title: 'tlc/Forms/Toggle',
    component: Toggle,
    render: (args) => <Toggle {...args} />,
    args: {
        'aria-label': 'Activer les notifications',
        label: 'Notifications'
    }
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = {
    args: {
        defaultPressed: true
    }
};

export const Accent: Story = {
    args: {
        variant: 'accent',
        defaultPressed: true
    }
};

export const Loading: Story = {
    args: {
        loading: true
    }
};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const Interactive: Story = {
    play: async ({ canvasElement }) => {
        const toggle = canvasElement.querySelector('[role="switch"]') as HTMLButtonElement | null;
        await userEvent.click(toggle!);
        await expect(toggle).toHaveAttribute('aria-checked', 'true');
        await userEvent.click(toggle!);
        await expect(toggle).toHaveAttribute('aria-checked', 'false');
    }
};
