import { colors as colorsConfig } from '../config';

export function communityColor(community: number): string {
  return (
    colorsConfig.palette[community % colorsConfig.palette.length] ??
    colorsConfig.defaultCommunity
  );
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [...colorsConfig.fallback];
  return [
    Number.parseInt(result[1]!, 16) / 255,
    Number.parseInt(result[2]!, 16) / 255,
    Number.parseInt(result[3]!, 16) / 255
  ];
}
