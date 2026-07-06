import { accentTokens, CategoryCard, DocCard, ProjectCard } from '../../components/cards';
import { DemoSection } from '../layout/DemoSection';

export function CardGalleries() {
  return (
    <DemoSection
      id="component-categorycards"
      title="CategoryCard / DocCard / ProjectCard"
      intro="App-specific card variants built on CardLink. Each uses the accentTokens system for its neon glow."
      code={`<CategoryCard title="color" iconName="color" href="/" color={accentTokens.primary} />
<DocCard title="getting started" iconName="book" href="/" />
<ProjectCard title="flow field" iconName="generative" href="/" />`}
    >
      <div className="grid grid-cols-1 gap-4 landscape:grid-cols-3">
        <CategoryCard
          label="Color"
          title="color"
          description="palette exploration in oklch space."
          iconName="color"
          href="/"
          color={accentTokens.primary}
        />
        <DocCard
          title="getting started"
          description="installation and setup guide."
          iconName="book"
          href="/"
          color={accentTokens.secondary}
        />
        <ProjectCard
          title="flow field"
          description="particle tracing on perlin noise."
          iconName="generative"
          href="/"
          style={{ '--_color': accentTokens.accent } as React.CSSProperties}
        />
      </div>
    </DemoSection>
  );
}
