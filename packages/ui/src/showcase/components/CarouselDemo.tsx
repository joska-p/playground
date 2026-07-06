import { Carousel, CarouselSlide } from '../..';
import { DemoSection } from '../layout/DemoSection';

export function CarouselDemo() {
  return (
    <DemoSection
      id="component-carousel"
      title="Carousel / CarouselSlide"
      intro="CSS scroll-snap with overflow-x: scroll. Arrow buttons call scrollBy on the track ref. Touch users can swipe without JS."
      apiRows={[
        { prop: 'scrollAmount', type: 'number', default: '280', notes: 'px per arrow click' },
        { prop: 'hideArrows', type: 'boolean', default: 'false' }
      ]}
      code={`<Carousel>
  <CarouselSlide>...</CarouselSlide>
  <CarouselSlide>...</CarouselSlide>
</Carousel>`}
    >
      <Carousel>
        {['noise landscapes', 'gradient meshes', 'ray marching'].map((label) => (
          <CarouselSlide key={label}>
            <img
              src="https://picsum.photos/seed/pgc1/400/225.jpg"
              alt=""
              className="aspect-video w-full object-cover"
            />
            <div className="p-3">
              <p className="text-foreground text-xs font-medium">{label}</p>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </DemoSection>
  );
}
