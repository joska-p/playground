import { AtlasFooter } from './AtlasFooter';
import { AtlasNav } from './AtlasNav';
import { CartographerStats } from './CartographerStats';
import { FieldNotes } from './FieldNotes';
import { HeroSection } from './HeroSection';
import { RegionGrid } from './RegionGrid';

export function AtlasLanding() {
  return (
    <div className="bg-background text-foreground min-h-screen font-mono">
      <AtlasNav />
      <HeroSection />
      <RegionGrid />
      <FieldNotes />
      <CartographerStats />
      <AtlasFooter />
    </div>
  );
}
