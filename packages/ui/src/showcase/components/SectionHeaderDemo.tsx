import { Zap } from 'lucide-react';
import { SectionHeader } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function SectionHeaderDemo() {
  return (
    <DemoSection
      id="component-sectionheader"
      title="SectionHeader"
      intro="Section header with optional icon, description, and a 'View all' link. Accent color via variant."
      apiRows={[
        { prop: 'title', type: 'string', default: 'required' },
        { prop: 'description', type: 'string', default: '—' },
        { prop: 'icon', type: 'ReactNode', default: '—' },
        { prop: 'href', type: 'string', default: '—' },
        { prop: 'variant', type: 'ColorVariant', default: '"primary"' },
        { prop: 'align', type: '"left" | "center"', default: '"left"' }
      ]}
      code={`<SectionHeader
  title="projects"
  description="explore creative coding."
  icon={<Zap />}
  href="/projects"
/>`}
    >
      <SectionHeader
        title="projects"
        description="explore creative coding experiments."
        icon={<Zap className="h-5 w-5" />}
        href="/projects"
      />
    </DemoSection>
  );
}
