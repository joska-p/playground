import { accentTokens } from '../../components/cards/accent-tokens/accentTokens';
import { CardLink } from '../../components/cards/card-link/CardLink';
import { Badge } from '../../components/data-display';
import {
  CardBody,
  CardDescription,
  CardImage,
  CardTitle
} from '../../components/data-display/card/Card';
import { DemoSection } from '../layout/DemoSection';

export function CardLinkDemo() {
  return (
    <DemoSection
      id="component-cardlink"
      title="CardLink"
      intro="Makes the entire card surface a click target with neon tube glow. Uses the accentTokens system."
      apiRows={[
        { prop: 'href', type: 'string', default: 'required' },
        { prop: 'accent', type: 'string', default: 'accentTokens.primary', notes: 'any CSS color' }
      ]}
      code={`<CardLink href="/" accent={accentTokens.primary}>
  <CardImage src="..." />
  <CardBody>
    <CardTitle>link card</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
</CardLink>`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-2">
        <CardLink
          href="/"
          accent={accentTokens.primary}
        >
          <CardImage src="https://picsum.photos/seed/pg3/400/225.jpg" />
          <CardBody>
            <CardTitle>primary link</CardTitle>
            <CardDescription>entire surface is the click target.</CardDescription>
          </CardBody>
        </CardLink>
        <CardLink
          href="/"
          accent={accentTokens.accent}
        >
          <CardBody>
            <Badge
              variant="accent"
              className="mb-2"
            >
              accent
            </Badge>
            <CardTitle>accent glow</CardTitle>
            <CardDescription>neon tube effect with color-mix().</CardDescription>
          </CardBody>
        </CardLink>
      </div>
    </DemoSection>
  );
}
