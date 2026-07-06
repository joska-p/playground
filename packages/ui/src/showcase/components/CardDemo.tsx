import { Cog } from 'lucide-react';
import { useState } from 'react';
import { Badge, Tooltip } from '../../components/data-display';
import {
  Card,
  CardActions,
  CardBody,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle
} from '../../components/data-display/card/Card';
import { Button } from '../../components/data-entry';
import { DemoSection } from '../layout/DemoSection';

export function CardDemo() {
  const [count, setCount] = useState(1);
  return (
    <DemoSection
      id="component-card"
      title="Card"
      intro="Card has an interactive variant with :has() hover glow. Sub-components: CardImage, CardBody, CardTitle, CardDescription, CardFooter, CardActions."
      apiRows={[
        { prop: 'interactive', type: 'boolean', default: 'false', notes: 'enables :has() glow' },
        {
          prop: 'variant',
          type: 'ColorVariant',
          default: '"primary"',
          notes: 'glow color (if interactive)'
        },
        { prop: 'horizontal', type: 'boolean', default: 'false', notes: 'row layout on landscape+' }
      ]}
      code={`<Card interactive variant="accent">
  <CardImage src="..." />
  <CardBody>
    <CardTitle>title</CardTitle>
    <CardDescription>description</CardDescription>
  </CardBody>
  <CardActions>
    <Button variant="ghost" size="icon"><Cog /></Button>
  </CardActions>
</Card>`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-2">
        <Card
          interactive
          variant="accent"
        >
          <CardImage src="https://picsum.photos/seed/pg2/400/225.jpg" />
          <CardBody>
            <Badge
              variant="accent"
              className="mb-2"
            >
              color
            </Badge>
            <CardTitle>oklch palette generator</CardTitle>
            <CardDescription>harmonious palettes in perceptually uniform space.</CardDescription>
          </CardBody>
          <CardFooter>
            <span className="text-foreground-dim text-xs">2 days ago</span>
            <span className="text-foreground-dim text-xs">{count} views</span>
          </CardFooter>
          <CardActions>
            <Tooltip content="settings">
              <Button
                variant="ghost"
                size="icon"
                aria-label="settings"
                onClick={() => {
                  setCount((c) => c + 1);
                }}
              >
                <Cog className="h-3.5 w-3.5" />
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
        <Card>
          <CardImage src="https://picsum.photos/seed/pg1/400/225.jpg" />
          <CardBody>
            <Badge
              variant="primary"
              className="mb-2"
            >
              generative
            </Badge>
            <CardTitle>flow field exploration</CardTitle>
            <CardDescription>perlin noise fields and particle tracing.</CardDescription>
          </CardBody>
          <CardFooter>
            <span className="text-foreground-dim text-xs">2 days ago</span>
            <Button
              variant="primary"
              size="sm"
            >
              view
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DemoSection>
  );
}
