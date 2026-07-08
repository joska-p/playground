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
 * Static, inert background layer — no cursor tracking.
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

// How much smaller than the viewport we actually rasterize the filter at.
// feTurbulence + feConvolveMatrix cost scales with pixel count, so we lay
// the SVG out at DOWNSCALE size (0.5 -> quarter the pixels for the filter
// to chew through) and scale the box back UP with a CSS transform to fill
// the viewport visually. transformOrigin is set inline (not via a utility
// class) so it can't get dropped by purge/specificity and silently default
// to center, which is what was pinning the old version into the
// bottom-right quadrant.
const DOWNSCALE = 0.5;

export function EdgeFieldSvg() {
  return (
    <div className="pointer-events-none fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Calm base contour field */}
      <svg
        className="absolute top-0 left-0"
        style={{
          width: `${DOWNSCALE * 100}%`,
          height: `${DOWNSCALE * 100}%`,
          transform: `scale(${1 / DOWNSCALE})`,
          transformOrigin: '0 0',
          opacity: 'var(--glow-strength-rest)',
          willChange: 'transform, opacity'
        }}
        aria-hidden="true"
      >
        <defs>
          <EdgeFilter
            id="edge-base"
            seed={11}
            baseFrequency="0.012 0.015"
            glowColor="var(--glow-color)"
            blur={1.1}
          />
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#edge-base)"
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
