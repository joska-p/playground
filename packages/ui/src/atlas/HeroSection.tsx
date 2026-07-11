import { Badge } from '../components/data-display/badge/Badge';
import { Hero } from '../components/data-display/hero/Hero';
import { Button } from '../components/data-entry/button/Button';
import { EdgeFieldMask } from '../components/widgets/edge-field/mask/EdgeFieldMask';

export function HeroSection() {
  return (
    <div className="relative">
      <EdgeFieldMask />

      <Hero
        variant="ghost"
        badgeText="Topographic UI System v0.1.0"
        title="Cartographer's Toolkit"
        highlight="ATLAS"
        description="A geographic atlas of composable UI primitives. Every component is a terrain — contour lines, elevation data, and density metrics mapped onto reactive surfaces."
      >
        <Button
          variant="primary"
          size="lg"
        >
          Explore Regions
        </Button>
        <Button
          variant="outline"
          size="lg"
        >
          Field Notes
        </Button>
        <Badge
          appearance="solid"
          variant="accent"
          dot
        >
          Live Survey
        </Badge>
      </Hero>
    </div>
  );
}
