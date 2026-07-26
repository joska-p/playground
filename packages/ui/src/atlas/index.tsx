import edgeField from '../components/widgets/edge-field/edge-field.webp';
import { AtlasFooter } from './AtlasFooter';
import { AtlasNav } from './AtlasNav';
import { CartographerStats } from './CartographerStats';
import { FieldNotes } from './FieldNotes';
import { HeroSection } from './HeroSection';
import { RegionGrid } from './RegionGrid';

export function AtlasLanding() {
  return (
    <div className="bg-background text-foreground min-h-screen font-mono">
      <div className="fixed top-0 left-0 h-full w-full overflow-hidden">
        <img
          src={edgeField}
          alt="Edge Field"
          className="h-full w-full object-cover"
        />
      </div>
      <AtlasNav />
      <HeroSection />
      <RegionGrid />
      <FieldNotes />
      <CartographerStats />
      <AtlasFooter />
    </div>
  );
}
