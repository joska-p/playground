import type { WalkerRule } from "../types.js";

const defaultWalkerRule: WalkerRule = {
  id: "default",
  name: "Default Random Walk",
  getNext: (context) => {
    const stepSize = 3;
    const dx = (Math.random() - 0.5) * 2 * stepSize;
    const dy = (Math.random() - 0.5) * 2 * stepSize;
    const newX = Math.max(0, Math.min(context.bounds.width, context.current.x + dx));
    const newY = Math.max(0, Math.min(context.bounds.height, context.current.y + dy));
    return { x: newX, y: newY };
  },
};

const bounceWalkerRule: WalkerRule = {
  id: "bounce",
  name: "Bounce Walk",
  getNext: (context) => {
    const stepSize = 2;
    const angle = Math.random() * Math.PI * 2;
    let newX = context.current.x + Math.cos(angle) * stepSize;
    let newY = context.current.y + Math.sin(angle) * stepSize;

    if (newX <= 0 || newX >= context.bounds.width) {
      newX = Math.max(0, Math.min(context.bounds.width, newX));
    }
    if (newY <= 0 || newY >= context.bounds.height) {
      newY = Math.max(0, Math.min(context.bounds.height, newY));
    }
    return { x: newX, y: newY };
  },
};

export { defaultWalkerRule, bounceWalkerRule };
