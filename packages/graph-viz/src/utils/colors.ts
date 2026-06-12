const PALETTE = [
  '#4cc9f0',
  '#4361ee',
  '#7209b7',
  '#f72585',
  '#f77f00',
  '#06d6a0',
  '#ffd166',
  '#ef476f',
  '#118ab2',
  '#06a77d',
  '#d62246',
  '#9b5de5',
  '#f15bb5',
  '#fee440',
  '#00bbf9',
  '#00f5d4',
  '#e07a5f',
  '#3d405b',
  '#81b29a',
  '#f2cc8f',
  '#a8dadc',
  '#457b9d',
  '#e63946',
  '#2a9d8f'
] as const;

export function communityColor(community: number): string {
  return PALETTE[community % PALETTE.length] ?? '#888888';
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0.5, 0.5, 0.5];
  return [
    Number.parseInt(result[1]!, 16) / 255,
    Number.parseInt(result[2]!, 16) / 255,
    Number.parseInt(result[3]!, 16) / 255
  ];
}
