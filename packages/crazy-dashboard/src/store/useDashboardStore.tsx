import { create } from "zustand";
import { visualizations } from "../core/visualizations/index.js";

interface DashboardStoreState {
  visualizations: (() => null)[];
}

const useDashboardStore = create<DashboardStoreState>()(() => ({
  visualizations,
}));

export { useDashboardStore };
