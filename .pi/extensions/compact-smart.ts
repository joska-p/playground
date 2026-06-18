/**
 * compact-smart — Proactive, preemptive compaction for pi
 *
 * Why this exists:
 *   Pi's built-in auto-compaction is reactive — it fires when you're already
 *   near the context limit. That's when I (the agent) start struggling with
 *   limited space for tool results and reasoning. This extension compacts
 *   *before* we get there.
 *
 * How it works:
 *   - After each turn, checks current context usage against a threshold
 *     (default: 70% of the model's context window).
 *   - When crossing the threshold from below → above, triggers pi's native
 *     compaction. This keeps the summary format I'm tuned to read.
 *   - Shows a live context gauge in the footer so you can see usage at a glance.
 *   - Won't compact again within a cooldown window (default 2 turns) to avoid
 *     churn.
 *
 * Commands:
 *   /compact-now [instructions] — compact immediately, optionally with focus
 *   /compact-now?               — query current stats
 *
 * Installation:
 *   Place in ~/.pi/agent/extensions/ (global) or .pi/extensions/ (project-local)
 *   then restart pi or run /reload.
 */

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

// ─── Configuration ──────────────────────────────────────────────────────────
// Tweak these before placing the file to tune behavior.

/** Fraction of context window that triggers compaction (0.0 – 1.0). */
const DEFAULT_THRESHOLD_RATIO = 0.7;

/** Fallback context window when we can't detect the model (in tokens). */
const FALLBACK_CONTEXT_WINDOW = 128_000;

/** Cooldown: minimum turns between compactions. */
const COOLDOWN_TURNS = 2;

/** Cooldown: minimum milliseconds between compactions. */
const COOLDOWN_MS = 30_000;

// ─── Gauge characters ───────────────────────────────────────────────────────

const GAUGE_FULL = "█";
const GAUGE_EMPTY = "░";
const GAUGE_SEGMENTS = 10;

// ─── Extension ──────────────────────────────────────────────────────────────

export default function (pi: ExtensionAPI) {
	// ── State ────────────────────────────────────────────────────────────

	let lastCompactTurn = -Infinity;
	let lastCompactTime = 0;
	let turnCount = 0;
	let isCompacting = false;

	// Cross-threshold detection: only fire once when crossing low → high.
	let wasBelowThreshold = true;

	// Track the threshold we're actually using (derived at session start)
	let effectiveThreshold = 60_000; // fallback
	let contextWindow = FALLBACK_CONTEXT_WINDOW;

	// ── Helpers ──────────────────────────────────────────────────────────

	/** Derive the compaction threshold from the current model. */
	function deriveThreshold(ctx: ExtensionContext): number {
		const model = ctx.model;
		const cw = model?.contextWindow ?? FALLBACK_CONTEXT_WINDOW;
		contextWindow = cw;
		const ratio = DEFAULT_THRESHOLD_RATIO;
		const raw = Math.round(cw * ratio);
		// Clamp: at least 10K, at most cw - 16K (leave room for response)
		return Math.max(10_000, Math.min(raw, cw - 16_000));
	}

	/** Format a token count for display. */
	function fmt(n: number): string {
		if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
		if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "K";
		return String(n);
	}

	/** Build the context gauge string with color. */
	function gauge(pct: number, theme: ThemeAPI): string {
		const filled = Math.round(pct * GAUGE_SEGMENTS);
		const bar =
			GAUGE_FULL.repeat(filled) + GAUGE_EMPTY.repeat(GAUGE_SEGMENTS - filled);
		const pctLabel = `${(pct * 100).toFixed(0)}%`;

		// Color by zone
		if (pct >= 0.85) return theme.fg("error", `${bar} ${pctLabel}`);
		if (pct >= 0.65) return theme.fg("warning", `${bar} ${pctLabel}`);
		return theme.fg("success", `${bar} ${pctLabel}`);
	}

	/** Trigger compaction if we haven't done so recently. Set `force` to bypass the cooldown (e.g. explicit /compact-now). */
	function tryCompact(ctx: ExtensionContext, customInstructions?: string, force = false): boolean {
		if (isCompacting) {
			if (ctx.hasUI) ctx.ui.notify("compact-smart: a compaction is already in progress", "warning");
			return false;
		}

		if (!force) {
			const now = Date.now();
			const turnAge = turnCount - lastCompactTurn;
			const timeAge = now - lastCompactTime;

			// Still cooling down if EITHER window hasn't elapsed yet — both must clear.
			if (turnAge < COOLDOWN_TURNS || timeAge < COOLDOWN_MS) {
				if (ctx.hasUI) {
					const remainingTurns = Math.max(0, COOLDOWN_TURNS - turnAge);
					const remainingSec = Math.ceil(Math.max(0, COOLDOWN_MS - timeAge) / 1000);
					ctx.ui.notify(
						`compact-smart: still cooling down (${remainingTurns} turn(s) / ${remainingSec}s remaining)`,
						"info",
					);
				}
				return false; // still in cooldown
			}
		}

		isCompacting = true;
		lastCompactTurn = turnCount;
		lastCompactTime = Date.now();
		wasBelowThreshold = false; // suppress re-trigger while still over threshold

		if (ctx.hasUI) {
			const pct = ((effectiveThreshold / contextWindow) * 100).toFixed(0);
			ctx.ui.notify(
				`compact-smart: compacting at ${fmt(effectiveThreshold)} (${pct}% of ${fmt(contextWindow)} window)`,
				"info",
			);
		}

		ctx.compact({
			customInstructions:
				customInstructions ??
				"Focus on preserving: current goals, key decisions, completed work, file changes, blockers, and next steps.",
			onComplete: () => {
				isCompacting = false;
				if (ctx.hasUI) ctx.ui.notify("compact-smart: compaction done", "info");
				updateFooter(ctx, 0); // 0 tokens after compaction
			},
			onError: (err: Error) => {
				isCompacting = false;
				if (ctx.hasUI) ctx.ui.notify(`compact-smart: compaction failed — ${err.message}`, "error");
			},
		});

		return true;
	}

	/** Update the footer status with current context usage. */
	function updateFooter(ctx: ExtensionContext, tokens: number | null | undefined) {
		const theme = ctx.ui.theme;
		if (tokens == null) {
			ctx.ui.setStatus("compact-smart", theme.fg("dim", "ctx: ?"));
			return;
		}
		const pct = tokens / contextWindow;
		const g = gauge(Math.min(pct, 1), theme);
		const label = theme.fg("dim", `ctx ${fmt(tokens)}/${fmt(contextWindow)}`);
		ctx.ui.setStatus("compact-smart", `${g} ${label}`);
	}

	// ── Lifecycle ────────────────────────────────────────────────────────

	pi.on("session_start", async (_event, ctx) => {
		turnCount = 0;
		lastCompactTurn = -Infinity;
		lastCompactTime = 0;
		wasBelowThreshold = true;
		effectiveThreshold = deriveThreshold(ctx);

		if (ctx.hasUI) {
			const pct = ((effectiveThreshold / contextWindow) * 100).toFixed(0);
			ctx.ui.notify(
				`compact-smart: threshold = ${fmt(effectiveThreshold)} (${pct}% of ${fmt(contextWindow)})`,
				"info",
			);
		}
		updateFooter(ctx, null);
	});

	// ── Turn tracking ────────────────────────────────────────────────────

	pi.on("turn_start", async (_event, ctx) => {
		turnCount++;
		const usage = ctx.getContextUsage();
		const tokens = usage?.tokens ?? null;
		if (tokens != null) {
			updateFooter(ctx, tokens);
		}
	});

	pi.on("turn_end", async (_event, ctx) => {
		const usage = ctx.getContextUsage();
		const tokens = usage?.tokens ?? null;
		if (tokens == null) return;

		updateFooter(ctx, tokens);

		// Cross-threshold check: only compact once when crossing low → high
		const overThreshold = tokens >= effectiveThreshold;
		if (overThreshold && wasBelowThreshold) {
			tryCompact(ctx);
		}
		wasBelowThreshold = !overThreshold;
	});

	// ── Commands ─────────────────────────────────────────────────────────

	pi.registerCommand("compact-now", {
		description: "Trigger compaction immediately. Append custom instructions, or use ? to query stats.",
		handler: async (args, ctx) => {
			const trimmed = args?.trim() ?? "";

			// Query mode
			if (trimmed === "?") {
				const usage = ctx.getContextUsage();
				const tokens = usage?.tokens ?? "?";
				const pct = typeof tokens === "number" ? ((tokens / contextWindow) * 100).toFixed(0) : "?";
				ctx.ui.notify(
					`compact-smart: ${fmt(typeof tokens === "number" ? tokens : 0)} / ${fmt(contextWindow)} tokens used (${pct}%), threshold = ${fmt(effectiveThreshold)}`,
					"info",
				);
				return;
			}

			const instructions = trimmed || undefined;
			tryCompact(ctx, instructions, true);
		},
	});

	// ── Also react to model changes ───────────────────────────────────────

	pi.on("model_select", async (event, ctx) => {
		effectiveThreshold = deriveThreshold(ctx);
		const pct = ((effectiveThreshold / contextWindow) * 100).toFixed(0);
		if (ctx.hasUI) {
			ctx.ui.notify(
				`compact-smart: model changed → threshold = ${fmt(effectiveThreshold)} (${pct}% of ${fmt(contextWindow)})`,
				"info",
			);
		}
		// Refresh footer
		const usage = ctx.getContextUsage();
		updateFooter(ctx, usage?.tokens ?? null);
	});
}

// ─── Minimal theme helper types ─────────────────────────────────────────────

interface ThemeAPI {
	fg(color: string, text: string): string;
}
