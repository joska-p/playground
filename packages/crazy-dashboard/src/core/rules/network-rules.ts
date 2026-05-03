import type { NetworkRule } from "../types.js";

const steadyNetworkRule: NetworkRule = {
  id: "steady",
  name: "Steady Traffic",
  getNext: (context) => {
    if (context.navigatorConnection) {
      return context.navigatorConnection.downlink * 1000;
    }
    return 500 + Math.random() * 100;
  },
};

const burstyNetworkRule: NetworkRule = {
  id: "bursty",
  name: "Bursty Traffic",
  getNext: (context) => {
    if (context.navigatorConnection) {
      return context.navigatorConnection.downlink * 1000;
    }
    const t = context.timestamp % 8000;
    if (t < 1000) return 2000 + Math.random() * 500;
    return 300 + Math.random() * 200;
  },
};

export { steadyNetworkRule, burstyNetworkRule };
