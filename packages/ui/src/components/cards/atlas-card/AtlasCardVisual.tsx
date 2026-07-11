import type { AtlasCardPaths } from './generateAtlasPaths';

export interface AtlasCardVisualProps {
  paths: AtlasCardPaths;
  /** Stagger the sample dots into a slow pulse — used by the animated card */
  animateDots?: boolean;
  /** Draw the open/closed paths on with a stroke-dashoffset animation — used by the animated card */
  animateLines?: boolean;
}

/**
 * The glow layers + generated SVG artwork shared by AtlasCard and AtlasCardAnimated.
 * Reads --variant-color (always) and --mx / --my (when driven by mouse tracking)
 * from the parent element's inline style.
 */
export function AtlasCardVisual({
  paths,
  animateDots = false,
  animateLines = false
}: AtlasCardVisualProps) {
  return (
    <>
      {animateLines && (
        <style>{`
          @keyframes atlas-draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      )}

      {/* Radial mouse-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mx) var(--my), color-mix(in oklch, var(--variant-color) 18%, transparent), transparent 50%)'
        }}
      />

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-450 group-hover:opacity-100"
        style={{
          boxShadow:
            '0 0 50px color-mix(in oklch, var(--variant-color) 25%, transparent), inset 0 0 60px color-mix(in oklch, var(--variant-color) 6%, transparent)',
          border: '1px solid color-mix(in oklch, var(--variant-color) 75%, transparent)'
        }}
      />

      {/* Generated Atlas-detection artwork */}
      <svg
        className="absolute inset-0 z-0 h-full w-full opacity-40 transition-all duration-500 group-hover:opacity-100"
        style={{ filter: 'drop-shadow(0 0 6px var(--variant-color))' }}
        viewBox="0 0 300 300"
        preserveAspectRatio="none"
      >
        <path
          d={paths.openPaths}
          fill="none"
          stroke="var(--variant-color)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          strokeDasharray={animateLines ? paths.openPathLength : undefined}
          strokeDashoffset={animateLines ? paths.openPathLength : undefined}
          style={
            animateLines
              ? { animation: 'atlas-draw 60s ease-out 0.1s alternate infinite' }
              : undefined
          }
        />
        <path
          d={paths.closedPaths}
          fill="none"
          stroke="var(--variant-color)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          strokeDasharray={animateLines ? paths.closedPathLength : undefined}
          strokeDashoffset={animateLines ? paths.closedPathLength : undefined}
          style={
            animateLines
              ? { animation: 'atlas-draw 60s ease-out 0.9s alternate infinite' }
              : undefined
          }
        />
        {paths.dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="var(--variant-color)"
            opacity="0.55"
            className={animateDots ? 'animate-pulse' : undefined}
            style={
              animateDots ? { animationDelay: dot.delay, animationDuration: '2.4s' } : undefined
            }
          />
        ))}
      </svg>
    </>
  );
}
