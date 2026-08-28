import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionItem } from '@repo/tlc/components/display';

const meta = {
    title: 'tlc/Display/Accordion',
    component: Accordion,
    render: (args) => (
        <Accordion {...args} className="w-full max-w-md">
            <AccordionItem title="Qu'est-ce que c'est ?">
                Un composant repliable construit sur l'élément natif <code>&lt;details&gt;</code>.
            </AccordionItem>
            <AccordionItem title="Comment l'utiliser ?">
                Empilez des <code>AccordionItem</code> avec un titre et du contenu.
            </AccordionItem>
        </Accordion>
    )
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const details = canvasElement.querySelector('details');
        (details as HTMLDetailsElement | null)?.click?.();
    }
};
