/**
 * EdgeField
 *
 * The whole "the page went through an edge-detection filter" illusion lives here.
 * Pipeline inside each SVG <filter>:
 *   1. feTurbulence  -> generate organic fractal noise (the "surface")
 *   2. feComponentTransfer (discrete) -> posterize the noise into flat bands,
 *      like a topographic height map
 *   3. feColorMatrix (matrix) -> desaturate the bands to grayscale
 *   4. feConvolveMatrix (Laplacian kernel) -> the actual edge detection:
 *      it lights up only where bands meet, i.e. the contour lines
 *   5. feColorMatrix (luminanceToAlpha) -> turn edge brightness into alpha
 *   6. feFlood + feComposite(in) -> paint those edges with the glow color
 *   7. feGaussianBlur + feMerge -> bloom so the lines actually glow
 *
 * We render it twice: a calm base layer, and a "hot" layer in a different hue
 * that is masked to the cursor so the filter appears to charge up where you look.
 */

// Laplacian edge-detection kernel (8-neighbour). Sums to zero, so flat areas
// go black and only transitions survive -> contour outlines.
const EDGE_KERNEL = '1 1 1 1 -8 1 1 1 1';

// Posterization steps -> the number of contour "rings" in the field.
const BANDS = '0 0.12 0.24 0.36 0.48 0.6 0.72 0.84';

type FilterDefProps = {
  id: string;
  seed: number;
  baseFrequency: string;
  glowColor: string;
  blur: number;
};

function EdgeFilter({ id, seed, baseFrequency, glowColor, blur }: FilterDefProps) {
  return (
    <filter
      id={id}
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency={baseFrequency}
        numOctaves={3}
        seed={seed}
        stitchTiles="stitch"
        result="noise"
      />
      <feComponentTransfer
        in="noise"
        result="banded"
      >
        <feFuncR
          type="discrete"
          tableValues={BANDS}
        />
        <feFuncG
          type="discrete"
          tableValues={BANDS}
        />
        <feFuncB
          type="discrete"
          tableValues={BANDS}
        />
      </feComponentTransfer>
      <feColorMatrix
        in="banded"
        type="matrix"
        values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1"
        result="gray"
      />
      <feConvolveMatrix
        in="gray"
        order="3"
        kernelMatrix={EDGE_KERNEL}
        divisor="1"
        bias="0"
        preserveAlpha="true"
        result="edges"
      />
      <feColorMatrix
        in="edges"
        type="luminanceToAlpha"
        result="edgeAlpha"
      />
      <feFlood
        floodColor={glowColor}
        result="ink"
      />
      <feComposite
        in="ink"
        in2="edgeAlpha"
        operator="in"
        result="coloredEdges"
      />
      <feGaussianBlur
        in="coloredEdges"
        stdDeviation={blur}
        result="bloom"
      />
      <feMerge>
        <feMergeNode in="bloom" />
        <feMergeNode in="coloredEdges" />
      </feMerge>
    </filter>
  );
}

export function EdgeField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Calm base contour field */}
      <svg
        className="drift absolute inset-0 h-full w-full"
        style={{ opacity: 'var(--glow-strength-rest)' }}
        aria-hidden="true"
      >
        <defs>
          <EdgeFilter
            id="edge-base"
            seed={11}
            baseFrequency="0.012 0.015"
            glowColor="oklch(0.82 0.16 92)"
            blur={1.1}
          />
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#edge-base)"
        />
      </svg>

      {/* Hot layer, masked to the cursor so the filter "charges" where you look */}
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{
          opacity: 'var(--glow-strength-hover)',
          maskImage:
            'radial-gradient(440px circle at var(--mx, 50%) var(--my, 40%), black 0%, black 18%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(440px circle at var(--mx, 50%) var(--my, 40%), black 0%, black 18%, transparent 78%)'
        }}
      >
        <defs>
          <EdgeFilter
            id="edge-hot"
            seed={11}
            baseFrequency="0.012 0.015"
            glowColor="oklch(0.82 0.14 155)"
            blur={1.8}
          />
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#edge-hot)"
        />
      </svg>

      {/* Vignette to keep the center readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(135% 110% at 50% 35%, transparent 55%, color-mix(in oklch, var(--background) 82%, transparent) 100%)'
        }}
      />
    </div>
  );
}
