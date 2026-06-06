type SVGProps = {
  paths: [number, number][][];
  width?: number;
  height?: number;
  lineWidth?: number;
  color?: string;
};

function generateSVG({
  paths,
  width = 400,
  height = 400,
  lineWidth = 2,
  color = '#777777',
}: SVGProps): string {
  // Use <polyline> for multi-point paths or construct a single 'd' path string
  const shapes = paths
    .filter((path) => path.length >= 2)
    .map((path) => {
      // Map [[x,y], [x,y]] into a space-separated coordinates string "x,y x,y"
      const points = path.map(([x, y]) => `${x},${y}`).join(' ');
      return `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="${lineWidth}" stroke-linecap="round" stroke-linejoin="round" />`;
    })
    .join('\n  ');

  // Wrap the shapes inside standard SVG root tags
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${shapes}
</svg>`;
}

export { generateSVG };
