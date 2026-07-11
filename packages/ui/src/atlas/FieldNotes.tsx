import { Accordion, AccordionItem } from '../components/data-display/accordion/Accordion';
import { SectionHeader } from '../components/data-display/section-header/SectionHeader';

const NOTES = [
  {
    title: 'How are contour lines generated?',
    body: 'Each EdgeCardAnimated uses a seeded PRNG (Mulberry32) to produce deterministic quadratic Bézier curves and closed polygons. The seed ensures the same terrain renders on every visit — no randomness at runtime.'
  },
  {
    title: 'What do the density values represent?',
    body: 'Density is a fictional metric mapped to each region. In practice it modulates the visual weight of the contour strokes: higher density → thicker, more tightly packed lines. It is purely decorative.'
  },
  {
    title: 'How does the edge detection work?',
    body: 'The EdgeField background uses an SVG filter pipeline: feTurbulence generates fractal noise, feComponentTransfer posterizes it into height bands, and feConvolveMatrix applies a Laplacian kernel to extract edges. The result is a live topographic overlay.'
  },
  {
    title: 'Can I create new regions?',
    body: 'Yes — pass any integer seed to EdgeCardAnimated. The PRNG is deterministic, so seed 42 always produces the same terrain. Mix seeds from different sources (timestamps, coordinates) for unique maps.'
  }
];

export function FieldNotes() {
  return (
    <section
      id="notes"
      className="mx-auto max-w-3xl px-6 py-20"
    >
      <SectionHeader
        variant="accent"
        title="Field Notes"
        description="Observations from the cartography team on how this atlas was built."
        iconName="book"
        align="center"
      />

      <Accordion className="mt-10">
        {NOTES.map((note) => (
          <AccordionItem
            key={note.title}
            title={note.title}
          >
            {note.body}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
