import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardDescription, CardTitle } from '@repo/tlc/components/display';

const meta = {
    title: 'tlc/Display/Card',
    component: Card,
    render: (args) => (
        <Card {...args} className="max-w-sm space-y-2 p-4">
            <CardTitle>Titre de la carte</CardTitle>
            <CardDescription>Une description concise du contenu affiché.</CardDescription>
        </Card>
    )
} satisfies Meta<typeof Card>;

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

export const Outline: Story = {
    args: {
        variant: 'outline'
    }
};
