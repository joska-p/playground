import type { AtlasCardVariantProps } from './variants';

export interface AtlasCardData {
  /** Deterministic seed used to generate the card's Atlas-detection artwork */
  seed: number;
  cardId?: string;
  cardTitle?: string;
  classification: string;
  density: string;
  resolution: string;
  /** Overrides the variant's color, e.g. 'var(--blue)', '#ff6b35' */
  color?: string;
}

export type AtlasCardBaseProps = AtlasCardData & AtlasCardVariantProps;

export type AtlasCardContentProps = Pick<
  AtlasCardData,
  'cardId' | 'cardTitle' | 'classification' | 'density' | 'resolution'
>;
