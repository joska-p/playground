export function generateGLSLFragment(options?: {
  inputSpace?: 'canvas' | 'normalized' | 'webgl';
  flipVertically?: boolean;
  correctAspectRatio?: boolean;
}): string {
  const inputSpace = options?.inputSpace ?? 'normalized';
  const flipVertically = options?.flipVertically ?? false;
  const correctAspectRatio = options?.correctAspectRatio ?? false;

  const lines: string[] = [];

  if (inputSpace === 'canvas') {
    lines.push('vec2 uv = gl_FragCoord.xy / u_resolution;');
    if (flipVertically) {
      lines.push('uv.y = 1.0 - uv.y;');
    }
  } else if (inputSpace === 'webgl') {
    lines.push('vec2 uv = vUv * 2.0 - 1.0;');
    if (flipVertically) {
      lines.push('uv.y = -uv.y;');
    }
  } else {
    lines.push('vec2 uv = vUv;');
    if (flipVertically) {
      lines.push('uv.y = 1.0 - uv.y;');
    }
  }

  if (correctAspectRatio) {
    lines.push('uv.x *= u_resolution.x / u_resolution.y;');
  }

  return lines.join('\n');
}
