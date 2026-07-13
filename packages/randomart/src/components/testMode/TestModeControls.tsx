import { ConfigSection } from './controls/ConfigSection';
import { RenderSection } from './controls/RenderSection';
import { SearchSection } from './controls/SearchSection';
import { SeedSection } from './controls/SeedSection';

function TestModeControls() {
  return (
    <>
      <SearchSection />
      <SeedSection />
      <RenderSection />
      <ConfigSection />
    </>
  );
}

export { TestModeControls };
