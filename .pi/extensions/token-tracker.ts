/**
 * token-tracker — Track token usage per turn and per session
 *
 * Why this exists:
 *   Free-tier models have usage limits. This extension shows you exactly
 *   how many tokens you consume each turn and across the whole session,
 *   so you know when you're getting close to limits.
 *
 * What it shows:
 *   - After each turn: notification with input/output/total tokens + cost
 *   - Footer: running total for the session (↑ input, ↓ output)
 *   - /tokens: detailed breakdown command
 *   - /tokens reset: reset counters mid-session
 *
 * Installation:
 *   Place in ~/.pi/agent/extensions/ (global) or .pi/extensions/ (project-local)
 *   then restart pi or run /reload.
 */

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

// ─── Types ──────────────────────────────────────────────────────────────────

interface UsageData {
	input: number;
	output: number;
	total: number;
	costTotal: number;
	turns: number;
}

// ─── State ──────────────────────────────────────────────────────────────────

let sessionUsage: UsageData = { input: 0, output: 0, total: 0, costTotal: 0, turns: 0 };

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmtNumber(n: number): string {
	if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
	if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "K";
	return String(n);
}

function fmtCost(cost: number): string {
	if (cost <= 0) return "$0";
	if (cost < 0.01) return "<$0.01";
	return "$" + cost.toFixed(2);
}

function updateFooter(ctx: ExtensionContext) {
	const theme = ctx.ui.theme;
	const text = theme.fg(
		"dim",
		`↑${fmtNumber(sessionUsage.input)} ↓${fmtNumber(sessionUsage.output)} Σ${fmtNumber(sessionUsage.total)}`,
	);
	const costStr = sessionUsage.costTotal > 0 ? " " + theme.fg("dim", fmtCost(sessionUsage.costTotal)) : "";
	ctx.ui.setStatus("token-tracker", text + costStr);
}

function notifyTurnUsage(ctx: ExtensionContext, input: number, output: number, total: number, cost: number) {
	if (!ctx.hasUI) return;

	const theme = ctx.ui.theme;
	const line = [
		theme.fg("accent", `turn #${sessionUsage.turns}`),
		theme.fg("dim", " tokens: ↑"),
		theme.fg("", fmtNumber(input)),
		theme.fg("dim", " ↓"),
		theme.fg("", fmtNumber(output)),
		theme.fg("dim", " = "),
		theme.fg("", fmtNumber(total)),
	];

	if (cost > 0) {
		line.push(theme.fg("dim", " cost: "), theme.fg("warning", fmtCost(cost)));
	}

	// Running total
	line.push(theme.fg("dim", " (session: "), theme.fg("", fmtNumber(sessionUsage.total)), theme.fg("dim", ")"));

	ctx.ui.notify(line.join(""), "info");
}

function resetUsage(ctx: ExtensionContext) {
	sessionUsage = { input: 0, output: 0, total: 0, costTotal: 0, turns: 0 };
	updateFooter(ctx);
	if (ctx.hasUI) ctx.ui.notify("token-tracker: counters reset", "info");
}

// ─── Extension ──────────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
	// Reset on new session
	pi.on("session_start", async (_event, ctx) => {
		resetUsage(ctx);
		notifyTurnUsage(ctx, 0, 0, 0, 0);
	});

	// Track each assistant response (tokens used)
	pi.on("message_end", async (event, ctx) => {
		if (event.message.role !== "assistant") return;

		const usage = event.message.usage;
		if (!usage) return;

		const input = usage.input ?? 0;
		const output = usage.output ?? 0;
		const total = usage.totalTokens ?? input + output;
		const cost = usage.cost?.total ?? 0;

		sessionUsage.input += input;
		sessionUsage.output += output;
		sessionUsage.total += total;
		sessionUsage.costTotal += cost;
		sessionUsage.turns++;

		notifyTurnUsage(ctx, input, output, total, cost);
		updateFooter(ctx);
	});

	// ── Commands ─────────────────────────────────────────────────────────

	pi.registerCommand("tokens", {
		description:
			"Show token usage stats. Use 'reset' to clear counters, or 'turn' to see last turn detail.",
		handler: async (args, ctx) => {
			const trimmed = args?.trim() ?? "";

			if (trimmed === "reset") {
				resetUsage(ctx);
				return;
			}

			// Show detailed breakdown
			const theme = ctx.ui.theme;
			const lines: string[] = [];

			// Header
			lines.push(theme.fg("accent", "── Token Usage ──"));

			// Per-turn average
			const avgTotal = sessionUsage.turns > 0
				? (sessionUsage.total / sessionUsage.turns).toFixed(0)
				: "—";
			lines.push(`  ${theme.fg("dim", "Turns:")}          ${sessionUsage.turns}`);
			lines.push(`  ${theme.fg("dim", "Avg per turn:")}    ${fmtNumber(Number(avgTotal))} tokens`);

			// Tokens
			lines.push("");
			lines.push(`  ${theme.fg("dim", "Input tokens:")}     ${fmtNumber(sessionUsage.input)}`);
			lines.push(`  ${theme.fg("dim", "Output tokens:")}    ${fmtNumber(sessionUsage.output)}`);
			lines.push(`  ${theme.fg("dim", "Total tokens:")}     ${theme.fg("", fmtNumber(sessionUsage.total))}`);

			// Cost (if applicable)
			if (sessionUsage.costTotal > 0) {
				lines.push("");
				lines.push(`  ${theme.fg("dim", "Estimated cost:")}  ${theme.fg("warning", fmtCost(sessionUsage.costTotal))}`);
			}

			// Context usage
			const ctxUsage = ctx.getContextUsage();
			if (ctxUsage?.tokens != null) {
				lines.push("");
				lines.push(`  ${theme.fg("dim", "Current context:")}  ${fmtNumber(ctxUsage.tokens)} tokens`);
			}

			lines.push(theme.fg("accent", "────────────────"));

			// Show as notification (lines separated by | for compactness)
			ctx.ui.notify(lines.join(" | "), "info");
		},
	});
}
