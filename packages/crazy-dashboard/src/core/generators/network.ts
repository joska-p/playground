import type { NetworkRule, NetworkRuleContext } from "../types.js";
import { steadyNetworkRule } from "../rules/network-rules.js";

function buildNetworkContext(current: number, timestamp: number): NetworkRuleContext {
  const context: NetworkRuleContext = { current, timestamp };

  if (typeof navigator !== "undefined" && "connection" in navigator && navigator.connection) {
    const conn = navigator.connection as unknown as { downlink: number; rtt: number };
    context.navigatorConnection = {
      downlink: conn.downlink,
      rtt: conn.rtt,
    };
  }

  return context;
}

function generateNetwork(
  rule: NetworkRule = steadyNetworkRule,
  current: number = 500,
  timestamp: number = Date.now()
): number {
  const context = buildNetworkContext(current, timestamp);
  return rule.getNext(context);
}

export { generateNetwork, buildNetworkContext };
