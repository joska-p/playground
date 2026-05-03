import type { CursorRule } from "../types.js";

const defaultCursorRule: CursorRule = {
  id: "default",
  name: "Raw Cursor",
  getNext: (context) => {
    return context.current;
  },
};

const smoothedCursorRule: CursorRule = {
  id: "smoothed",
  name: "Smoothed Cursor",
  getNext: (context) => {
    return context.current;
  },
};

export { defaultCursorRule, smoothedCursorRule };
