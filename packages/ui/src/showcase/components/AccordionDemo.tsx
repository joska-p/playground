import { Accordion, AccordionItem } from '../../components/data-display';
import { DemoSection } from '../layout/DemoSection';

export function AccordionDemo() {
  return (
    <DemoSection
      id="component-accordion"
      title="Accordion / AccordionItem"
      intro="Built on native &lt;details&gt; elements. Accordion is a styled wrapper; AccordionItem is a &lt;details&gt; with a CSS rotating chevron."
      code={`<Accordion>
  <AccordionItem title="question?" open>answer</AccordionItem>
  <AccordionItem title="another?">answer</AccordionItem>
</Accordion>`}
    >
      <Accordion>
        <AccordionItem
          title="what makes this different?"
          open
        >
          every component uses modern css features like :has(), @starting-style, and color-mix()
          instead of javascript state management.
        </AccordionItem>
        <AccordionItem title="why gruvbox?">
          warm, easy on the eyes, distinctive. feels like a workshop.
        </AccordionItem>
        <AccordionItem title="single mono font?">
          creative coding toolkit. monospace is the native habitat.
        </AccordionItem>
      </Accordion>
    </DemoSection>
  );
}
