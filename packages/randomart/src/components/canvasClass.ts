// Shared canvas layout classes so CPUCanvas and WebGLCanvas stay in sync
// if the styling ever changes.
export const CANVAS_CLASS = {
  container:
    'flex min-h-0 flex-1 items-center justify-center self-stretch overflow-hidden',
  canvas: 'border-border max-h-full max-w-full rounded-xl border shadow-lg'
} as const;
