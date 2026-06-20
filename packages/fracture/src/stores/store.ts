import { create } from 'zustand';

type StoreState = {
  expression: string;
};

const store = create<StoreState>(() => ({
  expression: ''
}));

export { store };
