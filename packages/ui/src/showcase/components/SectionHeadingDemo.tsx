import { SectionHeading } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function SectionHeadingDemo() {
  return (
    <DemoSection
      id="component-sectionheading"
      title="SectionHeading"
      intro="Decorative heading pair: a small uppercase label + a larger title. Good for page sections."
      apiRows={[
        { prop: 'label', type: 'string', default: 'required' },
        { prop: 'title', type: 'string', default: 'required' },
        { prop: 'description', type: 'ReactNode', default: '—' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' }
      ]}
      code={`<SectionHeading
  label="overview"
  title="What is pg_lab?"
  description="A design-first component toolkit."
/>`}
    >
      <SectionHeading
        label="overview"
        title="What is pg_lab?"
        description="A design-first component toolkit built on modern CSS and React 19."
      />
    </DemoSection>
  );
}
