import { Badge } from '../../components/data-display';
import { DemoSection } from '../layout/DemoSection';
import { VARIANTS } from '../layout/constants';

export function BadgeGallery() {
  return (
    <DemoSection
      id="component-badge"
      title="Badge"
      intro="Uses cva compound variants (variant x appearance). Supports soft (default), solid, and outline appearances plus a dot indicator."
      apiRows={[
        { prop: 'variant', type: 'ColorVariant', default: '"default"' },
        { prop: 'appearance', type: '"soft" | "solid" | "outline"', default: '"soft"' },
        { prop: 'dot', type: 'boolean', default: 'false' }
      ]}
      code={`<Badge variant="primary">primary</Badge>
<Badge variant="primary" appearance="solid">solid</Badge>
<Badge variant="primary" appearance="outline">outline</Badge>
<Badge variant="primary" dot>active</Badge>`}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              appearance="soft"
            >
              {v}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              appearance="solid"
            >
              {v}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              appearance="outline"
            >
              {v}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {VARIANTS.map((v) => (
            <Badge
              key={v}
              variant={v}
              dot
            >
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </DemoSection>
  );
}
