import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@repo/tlc/components/forms';

const meta = {
    title: 'tlc/Forms/Input',
    component: Input,
    render: (args) => <Input {...args} className="max-w-xs" />,
    args: {
        placeholder: 'Saisissez du texte…'
    }
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: {
        variant: 'primary'
    }
};

export const Destructive: Story = {
    args: {
        variant: 'destructive'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 'Valeur désactivée'
    }
};

export const Interactive: Story = {
    play: async ({ canvasElement }) => {
        const input = canvasElement.querySelector('input') as HTMLInputElement | null;
        input?.focus();
        input?.setAttribute('value', 'saisie utilisateur');
    }
};
