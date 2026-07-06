import { Hero } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function HeroSection() {
  return (
    <DemoSection
      id="component-hero"
      title="Hero"
      intro="Full-width hero section with badge, gradient headline, optional description, and CTA slot."
      code={`<Hero
  badgeText="v2.0"
  title="UI Library"
  highlight="pg_lab"
  description="Gruvbox-themed React 19 components built on Tailwind v4 and CVA."
  variant="primary"
/>`}
    >
      <Hero
        badgeText="v2.0"
        title="UI Library"
        highlight="pg_lab"
        description="Gruvbox-themed React 19 components built on Tailwind v4 and CVA."
        variant="primary"
      />
    </DemoSection>
  );
}
