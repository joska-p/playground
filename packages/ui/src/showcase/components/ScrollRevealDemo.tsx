import { ScrollReveal } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function ScrollRevealDemo() {
  return (
    <DemoSection
      id="component-scrollreveal"
      title="ScrollReveal"
      intro="Fades and slides up when scrolled into view. Uses IntersectionObserver with a 2s fallback timeout."
      code={`<ScrollReveal>
  <p>scroll down to reveal</p>
</ScrollReveal>`}
    >
      <ScrollReveal className="bg-surface-raised rounded-lg p-6 text-center text-sm">
        <p className="text-foreground-muted">↓ scroll down and back up to see me fade in</p>
      </ScrollReveal>
    </DemoSection>
  );
}
