export type Category =
  | 'generative'
  | 'color'
  | 'image'
  | 'data-viz'
  | 'random'
  | 'simulation';

export interface CategoryMeta {
  label: string;
  order: number;
  description: string;
}

export interface GroupedCategory {
  id: Category;
  label: string;
  description: string;
  count: number;
}
